# library-management-sys

## Overview
This project is an open-source Library Management System designed to:
1. Add and remove books.
2. Search and borrow books.
3. Manage user records.
4. Return books and handle overdue notifications.

## Installation
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the application: `python main.py`

## Features
- Add and remove books
- Search books by title, author, or ISBN
- Borrow and return books
- Manage user records

## Contributions
Follow the GitHub pull request workflow:
1. Create a feature branch.
2. Commit changes with clear messages.
3. Submit a pull request.

---

#### requirements

    ```bash
    sqlite3
    ```

---


### Project Structure

```plaintext
library-management-system/
├── lms/
│   ├── __init__.py          # Initializes the package
│   ├── models.py            # Contains the Book and User models
│   ├── main.py              # Main entry point for running the system
│   ├── utils.py             # Utility functions for common operations
│   └── notifications.py     # Handles overdue book notifications
├── tests/
│   └── test_models.py       # Unit tests for the models
├── README.md                # Project documentation
├── requirements.txt         # Dependencies for the project
└── .gitignore               # Git ignore file to exclude unnecessary files