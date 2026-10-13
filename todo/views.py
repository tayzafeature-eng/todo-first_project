import json 
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404 # redirect must be imported  
from .models import Task 
from django.views.decorators.csrf import csrf_exempt # Use if needed to exempt CSRF protection for specific views


def home(request):
    # Section to handle POST requests sent by JavaScript Fetch
    if request.method == "POST":
        # Reading JSON format data sent by JavaScript
        try:
            data = json.loads(request.body)
            text_form_website = data.get('task_text')
            category_form_website = data.get('task_category')

        except json.JSONDecodeError:
            # Fallback to reading standard form data if traditional form is used
            text_form_website = request.POST.get('task_text')
            category_form_website = request.POST.get('task_category')

        if text_form_website:
            if not category_form_website:
                category_form_website = 'Personal'

            # Save the new task to the database
            new_task = Task.objects.create(
                text=text_form_website,
                category=category_form_website
            )

            # Send success response to JavaScript without reloading the page
            return JsonResponse({
                'status': 'success',
                'message': 'Task created successfully!',
                'task_id': new_task.id,
                'task_text': new_task.text,
                'task_category': new_task.category
            })
        
    # Standard behavior for GET requests
    all_tasks = Task.objects.all()
    context = {
        'tasks': all_tasks
    }
    return render(request, 'todo/home.html', context)
    
# for delete logic
def delete_task(request, pk):
    task = get_object_or_404(Task, id=pk)

    if request.method == "POST":
        task.delete()
        # Send success response to JavaScript instead of standard redirect
        return JsonResponse({
            'status': 'success',
            'message': 'Task deleted successfylly!'
        })
    
    # If accessed via GET request, delete normally and redirect  
    task.delete()
    return redirect('home')

# for change task status logic
def complete_task(request, pk):
    task = get_object_or_404(Task, id=pk)

    # If the request comes via POST from JavaScript Fetch
    if request.method == "POST":
        task.completed = not task.completed # Toggle True to False, or False to True
        task.save()

        return JsonResponse({
            'status': 'success',
            'is_completed': task.completed # Include current status so frontend knows
        })
    
    # If accessed via standard browser link, handle it the old way
    task.completed = not task.completed
    task.save()
    return redirect('home')