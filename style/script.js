let content = document.querySelector(".content");
let form = document.querySelector(".addTask");
let addTaskIcon = document.querySelector(".task");
let taskWrap = document.querySelector(".TaskWrap");
// console.log(main);
// console.log(content);
let arr =JSON.parse( localStorage.getItem("arr"))||[];
console.log(arr);
const showAddField = () => {
  // console.log(form);
  form.classList.add("showField");
  addTaskIcon.classList.remove("showAddIcon");
};
function showAllTasks(array) {
  array.map((task) => {
    let div = document.createElement("div");
    div.className = "text";

    div.innerHTML = `<img  onclick="deleteTask(${task.id})" src="./Assets/Frame.svg" alt="remove  completed task">
                
                <div class="checkWrapper">
                    <input type="checkbox" onclick="markAsComplete(${task.id})">
                    <div class="checkbox">
                        <img src="./Assets/checkbox.svg" alt="task has been completed">

                    </div>

                </div>
                <p id=task-${task.id} class="content">${task.task}</p>
`;
    taskWrap.appendChild(div);
  });
}

function markAsComplete(id) {
  document.querySelector(`#task-${id}`).classList.toggle("showCompleted");
}
function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#taskInput");
  let value = input.value;
  if (value) {
    input.classList.remove("error");
    var addTask = {
      id: Date.now(),
      task: value,
    };
    arr.push(addTask);
    localStorage.setItem("arr", JSON.stringify(arr));
    clearActivities();
    showAllTasks(arr);
    input.value = null;
  } else {
    input.classList.add("error");
  }
  form.classList.remove("showField");
  addTaskIcon.classList.add("showAddIcon");
}
//add task on first load
showAllTasks(arr);

function deleteTask(id) {
  console.log(id);
  arr = arr.filter((elem) => elem.id !== id);
  localStorage.setItem("arr", JSON.stringify(arr));
  clearActivities();
  showAllTasks(arr);
}
const clearActivities = () => {
  //Clear all activities from html
  const activities = document.querySelectorAll(".text");
  console.log(activities);
  activities.forEach((a) => a.remove());
};
