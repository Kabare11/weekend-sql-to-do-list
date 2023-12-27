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
    })
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
            <div class="">
                <button >Complete</button>
                <button data-testid="deleteButton" onclick="deleteBtn(${task.id})">Delete</button>
            </div>
        </div>`
    }
}

getTasks()

const deleteBtn = (id) => {
    axios({
        method: 'DELETE',
        url: `/todos/${id}`
    }).then((res) => getTasks())
    // .then(res => printTask(res))
}