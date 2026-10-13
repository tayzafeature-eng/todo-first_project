# Django To-Do Application 📝

Welcome to my **first-ever project** built with Python and Django! This is a simple, clean, and beginner-friendly To-Do web application designed to help users efficiently manage their daily tasks. 

As this is my foundational project in backend development, I built it to understand core concepts such as Django project architecture, MVT (Model-View-Template) pattern, database relationships, and CRUD operations.

---

## 🚀 Features

* **Task Management (CRUD):** Users can Create, Read, Update, and Delete tasks.
* **Task Categories:** Organize tasks using custom task categories[cite: 1].
* **Interactive Frontend (JavaScript):** Uses custom JavaScript (`main.js`) for dynamic features like real-time task searching and category filtering without page reloads[cite: 1, 2].
* **Database:** Uses Django's default built-in SQLite database for quick local setup.
* *(Note: User authentication is not included in this version, meaning tasks are managed in a single shared or local workspace).*

---

## 🛠️ Tech Stack

* **Backend:** Python, Django
* **Database:** SQLite (Default)
* **Frontend:** HTML5, CSS3, JavaScript (`main.js`), Django Templates[cite: 1, 2]
* **Version Control:** Git & GitHub

---

## 📁 Project Structure

```text
django_todo_app/
│
├── myproject/          # Project settings, URLs, and configurations[cite: 1]
├── todo/               # Main app containing models, views, migrations, and static files[cite: 1]
│   ├── static/todo/    # Static assets (CSS style.css, JavaScript main.js)[cite: 1, 2]
│   └── templates/      # HTML frontend templates[cite: 1]
├── db.sqlite3          # Default SQLite database[cite: 1]
├── manage.py           # Django command-line utility[cite: 1]
└── requirements.txt    # Project Python dependencies[cite: 1]

**Local Installation & Setup Guide

1. Prerequisites
Make sure you have the following installed on your system:
* Python(v3.8 or higher recommended)
* Git

2. Clone the Reposity
* git clone [git@github.com:tayzafeature-eng/todo-first_project.git
](git@github.com:tayzafeature-eng/todo-first_project.git
)
* cd django_todo_app-main

3. Create and Activate a Virtual Environment
* Windows
----------
* python -m venv venv
venv\Scripts\activate

* macOS/Linux:
---------------
* python3 -m venv venv
source venv/bin/activate

4. Install Dependencies
* pip install -r requirements.txt

5. Run Database Migrations
* python3 manage.py makemigrations
* python3 manage.py migrate

6. Run the Development Server
* python3 manage.py runserver

7. Access the Application
* http://127.0.0.1:8000/


-> Usage Guide
1. Navigate to http://127.0.0.1:8000/ in your browser.
2. Add new tasks and categorize them.
3. Use the live search bar or category filters powered by JavaScript to easily sort and find your tasks. 

==> Contributing & Feedback
Since this is my first project, constructive feedback, bug reports, and suggestions for improvement are heavily welcomed! Feel free to open an issue or submit a pull request if you'd like to contribute.

1.Fork the Project
2. Create your Feature Branch (git checkout -b feature/YourFeatureName)
3. Commit your Changes (git commit -m 'Add some feature')
4. Push to the Branch (git push origin feature/YourFeatureName)
5. Open a Pull Request

==> License
This project is open-source and available under the MIT License.
