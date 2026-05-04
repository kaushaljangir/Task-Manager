document.addEventListener('DOMContentLoaded', () => {
    const taskInput= document.querySelector("#task-input");
    const addTaskBtn= document.querySelector("#add-task-btn");
    const taskList= document.querySelector("#task-list");
    const emptyImg = document.querySelector(".empty-img");

    const toggleEmptyState = () => {
        emptyImg.style.display = taskList.children.length === 0 ? "block" : "none";
        };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText){
            return;
        }

        const li= document.createElement("li");
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = "";
        toggleEmptyState();
    };

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) =>{
        if(e.key === "Enter") {
            addTask(e);
        }
    });
});