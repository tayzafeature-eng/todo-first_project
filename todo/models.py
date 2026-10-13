from django.db import models

class Task(models.Model):

    # Define maximum length for the task text as 255 characters
    text = models.CharField(max_length=255)

    # Define a boolean field to indicate whether the task is completed or not, defaulting to False
    completed = models.BooleanField(default=False)

    # Define a category field for the task, with a maximum length of 100 characters and a default value of 'Personal'
    category = models.CharField(max_length=100, default='Personal')

    # String representation to displey the task name clearly in the database and admin interface
    def __str__(self):
        return self.text
