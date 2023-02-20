const input = document.querySelector(".text-input")
const btn = document.querySelector(".add-btn")
const list = document.querySelector(".list")

const classes = {
    li: `list-group-item d-flex justify-content-between align-items-center`,
    delBtn: "del-btn btn btn-danger",
    checked: "check-box mx-2"
}



function  view () {
    const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    const tasks = JSON.parse(localStorage.getItem("task")) || []
    let allList = ""
    tasks.map(el =>
        allList += `<li class="${classes.li}">
<span>
<input ${el.isDone ? "checked" : ""} type="checkbox" class="${classes.checked}">
${el.title}
<span class="mx-3">${time}</span>

</span>
<button class="${classes.delBtn}">delete</button>
</li>`

    )
    list.innerHTML = allList
    delTask()
    checkBox()
    input.value = ''
}
view()


input.addEventListener("keydown", (e) =>{
    if (e.key === "Enter") {
        let taskss = JSON.parse(localStorage.getItem("task")) || {}

        const  newTask = {
            id: taskss.length ? taskss [taskss.length - 1 ].id + 1 : 1,
            title:input.value,
            isDone: false

        }
        taskss = [...taskss,newTask]
        localStorage.setItem("task",JSON.stringify(taskss))
        view()
    }

})


function delTask () {
    const buttons = document.querySelectorAll(".del-btn")
    let tasks = JSON.parse(localStorage.getItem("task")) || []

    buttons.forEach( (btn,index) => {
        btn.addEventListener("click",() => {
            tasks = tasks.filter((el,idx) => {
                return index !== idx
            })
            localStorage.setItem("task",JSON.stringify(tasks))
            view()
        })
    })
}

btn.addEventListener("click", ()=> {
    let tasks = JSON.parse(localStorage.getItem("task")) || {}

    const  newTask = {
        id: tasks.length ? tasks [tasks.length - 1 ].id + 1 : 1,
        title:input.value,
        isDone: false

    }
    tasks = [...tasks,newTask]
    localStorage.setItem("task",JSON.stringify(tasks))
    view()

})


function checkBox () {
    const checkboxes = document.querySelectorAll(".check-box")
    let  tasks = JSON.parse(localStorage.getItem("task")) || []

    checkboxes.forEach((check,index) => {
        check.addEventListener("click", (e) => {
            e.target.parentNode.classList.toggle("line")
            tasks = tasks.map((el,idx) => {
                if (index === idx) {
                    return {...el,isDone: !el.isDone}
                } else {
                    return el
                }
            })
            localStorage.setItem("task",JSON.stringify(tasks))
        })
    })
}