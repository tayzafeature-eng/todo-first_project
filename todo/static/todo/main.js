// 1. Logic for search functionality
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', function(){
        const filterValue = searchInput.value.toLowerCase();
        // Find all li tags rendered by Django in the HTML
        const listItem = document.querySelectorAll('#myList li').length;

        listItem.forEach(item => {
            // Find the span containing the task text inside the li tag
            const textElement = item.querySelector('.fs-5');

            if (!textElement) return;

            const taskText = textElement.textContent.toLowerCase();

            if (taskText.includes(filterValue)) {
                item.style.setProperty('display', 'flex', 'important');
            }else {
                item.style.setProperty('display', 'none', 'important');
            }
        });
    });
}

function filterCategory(category, button) {
    // 1. Switch active state for buttons (UI styling)
    document.querySelectorAll('.d-flex .btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // 2. Filter tasks on the frontend based on the selected category
    const tasks = document.querySelectorAll('.list-group-item');
    tasks.forEach(task => {
        if (category === 'All' || task.getAttribute('data-category') === category) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });

    // 🌟 3. Handle category value sent to backend views
    // If user clicks 'All', set default to 'Personal'[cite: 4]
    if (category === 'All') {
        document.getElementById('selectedCategory').value = 'Personal';
    } else {
        // Set the form value according to the selected category ('Work', 'Study', 'Personal')
        document.getElementById('selectedCategory').value = category;
    }
}

// Handle HTML Form using JavaScript and Fetch API
const todoForm = document.getElementById('todoForm');

todoForm.addEventListener('submit', function(event){
    // Prevent website from reloading when form is submitted (default behavior)
    event.preventDefault();

    // Get text value from the input box
    const taskText = document.getElementById('taskInput').value;
    // Get category value from the hidden input field (set by filterCategory function)
    const taskCategory = document.getElementById('selectedCategory').value;

    // Get Django's CSRF Token from HTML header to send with Fetch API request
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Fetch API implementation for asynchronous form submission to Django backend
    // Update the URL according to your backend setting (e.g., '/home/')
    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken // Send Django CSRF Token in the request header for security
        },
        // Convert data object to JSON String to send in the request body
        body: JSON.stringify({
            'task_text': taskText,
            'task_category': taskCategory
        })
    })
    .then(response => response.json())// Parse response to JSON format
    .then(data => {
        // Find <ul id="taskList"> in the HTML to append new <li> tag
        const taskList = document.getElementById('taskList');

        // If there are not tasks yet, clear the 'No tasks available' message before appending new task
        if (taskList.children.length === 1 && taskList.children[0].textContent.includes('No tasks available')) {
            taskList.innerHTML = '';
        }

        // Create new <li> tag dynamically using JavaScript
        const newLi = document.createElement('li');
        newLi.className = 'list-group-item d-flex justify-content-between align-items-center';
        newLi.setAttribute('data-category', data.task_category); // For filtering tasks by category later

        // Assign badge styling according to the task category (Work, Study, Personal)
        let badgeHTML = '';
        if (data.task_category === 'Work') {
            badgeHTML = `<span class="badge bg-danger me-2">💼 Work</span>`
        } else if (data.task_category === 'Study') {
            badgeHTML = `<span class="badge bg-warning text-dark me-2">📚 Study</span>`
        } else {
            badgeHTML = `<span class="badge bg-info text-dark me2">🏠 Personal</span>`
        }

        // Render HTML structure inside the newly created <li> tag using template literals
        newLi.innerHTML = `
            <div class="d-flex align-items-center w-100">
                ${badgeHTML}
                <div class="d-flex align-items-center">
                    <button class="btn btn-link p-0 text-decoration-none complete-btn" data-id="${data.task_id}">
                        <span class="status-icon me-2 text-muted">⭕</span>
                    </button>
                    <span class="fs-5 task-text">${data.task_text}</span>
                </div>
            </div>
            
            <button class="btn btn-sm btn-danger delete-btn" data-id="${data.task_id}">❌</button>
        `;

        // Append the newly created <li> tag to the <ul id="taskList"> in the HTML
        taskList.appendChild(newLi);

        // Clear the input box after successfully adding a new task
        document.getElementById('taskInput').value = '';
    })
    .catch(error => {
        console.error("An error occurred during submission -", error); // Catch errors  
    });
});

const taskListContainer = document.getElementById('taskList');

taskListContainer.addEventListener('click', function(event){
    // Handle delete action when delete button is clicked (or its child icon is clicked)
    if(event.target.classList.contains('delete-btn')){
        const button = event.target;
        const taskId = button.getAttribute('data-id'); // Get the Task ID  
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        // Confirm deletion with the user  
        if (confirm("Are you sure you want to delete this task?")){
            // Send POST request to backend delete URL path
            fetch(`/delete/${taskId}/`, {
                method: 'POST',
                headers:{
                    'X-CSRFToken': csrfToken
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Remove the specific <li> tag from DOM when deleted 
                    const liToDestory = button.closest('li');
                    liToDestory.remove();

                    // If no tasks left, show the 'No tasks avalilable' message
                    const remainingTasks = document.getElementById('taskList');
                    if (remainingTasks.children.length === 0) {
                        remainingTasks.innerHTML = '<li class="list-group-item text-center text-muted">No tasks available</li>';
                    }
                }
            })
            .catch(error => console.error("An error occurred while deleting the task -", error));
        }
    }

    // Check if Complete Button is clicked  
    // Use .closest() so that clicking the icon also works for the button
    const completeBtn = event.target.closest('.complete-btn')

    if (completeBtn) {
        const taskId = completeBtn.getAttribute('data-id');
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const liElement = completeBtn.closest('li');
        const statusIcon =completeBtn.querySelector('.status-icon');
        const taskTextSpan = liElement.querySelector('.task-text');

        // Send POST request to backend complete URL path
        fetch(`/complete/${taskId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                if (data.is_completed) {
                    // If True, change to completed checkmark and style the task text with strikethrough and muted color
                    statusIcon.textContent = '✅';
                    statusIcon.className = 'status-icon me-2 text-success';
                    taskTextSpan.classList.add('text-decoration-line-through', 'text-muted');
                } else {
                    // If False, change back to incomplete circle and remove strikethrough and muted color from task text
                    statusIcon.textContent = '⭕';
                    statusIcon.className = 'status-icon me-2 text-muted';
                    taskTextSpan.classList.remove('text-decoration-line-through', 'text-muted');
                }
            }
        })
        .catch(error => console.error("An error occurred while updating task status -", error)); // Catch errors
    }
});
