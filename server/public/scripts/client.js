const inputTask = document.getElementById("inputTask")
const form = document.getElementById("form")
const tableContent = document.getElementById("table")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    createTask()
})

const createTask = () => {
    axios({
        method: 'POST',
        url: '/todos',
        data: {
            text: inputTask.value,
            isComplete: false
        }
    }).then(() => getTasks())
}

const getTasks = () => {
    axios({
        method: 'GET',
        url: '/todos'
    }).then((res) => res.data)
        .then(res => printTask(res))
}

const printTask = (tasks) => {
    tableContent.innerHTML = ""
    for (let task of tasks) {
        console.log(task)
        tableContent.innerHTML += `
        <div class="task" data-testid="toDoItem">
            <p>${task.text}</p>
            <p>Status: ${task.isComplete ? "Completed" : "Incomplete"}</p>
            <button data-testid="completeButton" onclick="updateTask(${task.id})">Complete</button>
            <button data-testid="deleteButton" onclick="deleteBtn(${task.id})">Delete</button>
        </div>`
    }
}

getTasks()

const deleteBtn = (id) => {
    axios({
        method: 'DELETE',
        url: `/todos/${id}`
    }).then((res) => getTasks())
}

const updateTask = (id) => {
    console.log("update", id)
    axios({
        method: 'PUT',
        url: `/todos/${id}`,
        data: {
            isComplete: true
        }
    }).then((res) => getTasks())
}