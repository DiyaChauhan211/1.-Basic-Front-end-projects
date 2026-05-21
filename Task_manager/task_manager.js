const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
      pendingList.innerHTML = "";
      completedList.innerHTML = "";

      tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = task.completed ? "task completed" : "task";
        li.draggable = !task.completed;

        li.innerHTML = `
          <input 
            type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleComplete(${index})"
          >

          <div class="task-info">
            <h3>${task.text}</h3>

            <p>
              <span class="category ${task.category}">
                ${task.category}
              </span>

              | Due: ${task.date || "No date"}
            </p>
          </div>

          <div class="buttons">

            ${
              !task.completed
              ? `<button class="complete-btn" onclick="toggleComplete(${index})">
                  Complete
                 </button>`
              : ""
            }

            <button class="delete-btn" onclick="deleteTask(${index})">
              Delete
            </button>

          </div>
        `;

        if (!task.completed) {
          addDragEvents(li, index);
          pendingList.appendChild(li);
        } else {
          completedList.appendChild(li);
        }
      });
    }

    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const categoryInput = document.getElementById("categoryInput");
      const dateInput = document.getElementById("dateInput");

      const text = taskInput.value.trim();

      if (text === "") {
        alert("Please enter a task");
        return;
      }

      tasks.push({
        text,
        category: categoryInput.value,
        date: dateInput.value,
        completed: false
      });

      saveTasks();
      renderTasks();

      taskInput.value = "";
      dateInput.value = "";
    }

    function deleteTask(index) {
      tasks.splice(index, 1);

      saveTasks();
      renderTasks();
    }

    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;

      saveTasks();
      renderTasks();
    }

    // Drag and Drop
    let dragStartIndex;

    function addDragEvents(item, index) {

      item.addEventListener("dragstart", () => {
        dragStartIndex = index;
      });

      item.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      item.addEventListener("drop", () => {

        const draggedTask = tasks[dragStartIndex];

        tasks.splice(dragStartIndex, 1);
        tasks.splice(index, 0, draggedTask);

        saveTasks();
        renderTasks();
      });
    }

    renderTasks();
