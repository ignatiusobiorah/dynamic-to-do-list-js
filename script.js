
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve tasks or initialize empty array
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load each task, do not save again
    }

    // Function to add a new task to the DOM and optionally to Local Storage
    function addTask(taskText, save = true) {
        // Create a new list item (li) for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item');

        // Create a "Remove" button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Event listener for removing the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText); // Remove task from Local Storage
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // If save is true, update Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText); // Add new task to the array
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated array back to Local Storage
        }

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Remove the specified task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update Local Storage
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
        } else {
            addTask(taskText); // Add task and save to Local Storage
        }
    });

    // Event listener for the "Enter" key in the task input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
            } else {
                addTask(taskText); // Add task and save to Local Storage
            }
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();

});
