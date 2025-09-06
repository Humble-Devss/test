
// Task structure
class Task {
    constructor(id, text, date) {
        this.id = id;
        this.text = text;
        this.date = date;
    }
}

// Backend API URL
const API_URL = 'http://127.0.0.1:3000/tasks';

// Load tasks from backend
async function loadTasks() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return await res.json();
    } catch (e) {
        return [];
    }
}

// Save a new task to backend
async function saveTask(task) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        return await res.json();
    } catch (e) {
        return null;
    }
}

// Generate unique ID for tasks
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add new task
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    if (!taskInput.value || !taskDate.value) {
        alert('Please enter both task text and date');
        return;
    }
    const task = new Task(generateId(), taskInput.value, taskDate.value);
    await saveTask(task);
    // Clear inputs
    taskInput.value = '';
    taskDate.value = '';
    // Refresh board
    renderBoard();
}

// Determine task status based on date
function getTaskStatus(date) {
    const taskDate = new Date(date);
    const today = new Date();
    
    // Reset time part for accurate date comparison
    taskDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (taskDate > today) {
        return 'backlog';
    } else if (taskDate.getTime() === today.getTime()) {
        return 'inProgress';
    } else {
        return 'done';
    }
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Create task card element
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
        <div>${task.text}</div>
        <div class="date">${formatDate(task.date)}</div>
    `;
    return card;
}

// Render the entire board
async function renderBoard() {
    const tasks = await loadTasks();
    // Clear all columns
    document.getElementById('backlogTasks').innerHTML = '';
    document.getElementById('inProgressTasks').innerHTML = '';
    document.getElementById('doneTasks').innerHTML = '';
    // Distribute tasks to appropriate columns
    tasks.forEach(task => {
        const status = getTaskStatus(task.date);
        const card = createTaskCard(task);
        switch(status) {
            case 'backlog':
                document.getElementById('backlogTasks').appendChild(card);
                break;
            case 'inProgress':
                document.getElementById('inProgressTasks').appendChild(card);
                break;
            case 'done':
                document.getElementById('doneTasks').appendChild(card);
                break;
        }
    });
}

// Initialize the board
document.addEventListener('DOMContentLoaded', () => {
    renderBoard();
});

// Auto-update board every minute to check for status changes
setInterval(renderBoard, 60000);
