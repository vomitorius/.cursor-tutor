class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.addButton = document.getElementById('addButton');
        
        this.initializeEventListeners();
        this.render();
    }

    initializeEventListeners() {
        this.addButton.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }

    render() {
        this.todoList.innerHTML = '';
        
        this.todos.forEach((todo, index) => {
            const todoItem = this.createTodoElement(todo, index);
            this.todoList.appendChild(todoItem);
        });
        
        this.saveTodos();
    }

    createTodoElement(todo, index) {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => this.toggleTodo(index));
        
        const todoText = document.createElement('span');
        todoText.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Törlés';
        deleteBtn.addEventListener('click', () => this.deleteTodo(index));
        
        todoItem.append(checkbox, todoText, deleteBtn);
        return todoItem;
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (text) {
            this.todos.push({
                text,
                completed: false,
                createdAt: new Date().toISOString()
            });
            
            this.todoInput.value = '';
            this.render();
        }
    }

    toggleTodo(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.render();
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.render();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

// Alkalmazás inicializálása
document.addEventListener('DOMContentLoaded', () => {
    new TodoList();
}); 