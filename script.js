document.addEventListener('DOMContentLoaded', () => {
    const taskInput= document.querySelector("#task-input");
    const addTaskBtn= document.querySelector("#add-task-btn");
    const taskList= document.querySelector("#task-list");
    const emptyImg = document.querySelector(".empty-img");
    const progressBar = document.querySelector(".progress");
    const progressNumbers = document.querySelector("#numbers");

    const toggleEmptyState = () => {
        emptyImg.style.display = taskList.children.length === 0 ? "block" : "none";
        };

    const updateProgress = (checkCompletion = true) =>{
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll(".checkbox:checked").length;

        progressBar.style.width = totalTasks ? `${(completedTasks/totalTasks) * 100}%` : "0%";
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
    };


    const addTask = (event,completed = false,checkCompletion = true) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText){
            return;
        }

        const li= document.createElement("li");
         li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        <div class="task-buttons">
        <button class="dlt-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        
        const checkbox = li.querySelector(".checkbox");
        
        checkbox.addEventListener("change", ()=>{
            const isChecked = checkbox.checked;
            li.classList.toggle("completed", isChecked);
            updateProgress();
        });

        li.querySelector(".dlt-btn").addEventListener("click", () =>{
            li.remove();
            toggleEmptyState();
            updateProgress();
        });

        taskList.appendChild(li);
        taskInput.value = "";
        toggleEmptyState();
        updateProgress(checkCompletion);
    };

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) =>{
        if(e.key === "Enter") {
            addTask(e);
        }
    });
});