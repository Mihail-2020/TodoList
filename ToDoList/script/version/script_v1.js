const inputTask = document.querySelector('#inputTask');
const addButton = document.querySelector('#add__button');
const listBox = document.querySelector('#list__box');

const taskList = [];

addButton.addEventListener('click', addTask);

function addTask() {
	if (inputTask.value === '') {
		alert('Введите пожалуйста задачу!!!');
	} else {
		taskList.push({
			title: inputTask.value,
			checked: false,
		});
		inputTask.value = '';
		renderTasks();
	}
}

function renderTask(task) {
	console.log(task)
	const taskElement = document.createElement('li');
	taskElement.classList.add('list__item');

	if (task.checked) {
		taskElement.classList.add('checked');
	}

	taskElement.innerHTML = `
	<span class="list__task" id="toggleTask">
		${task.title}
	</span>

	<select name="" id="">
		<option value="High">Высокий</option>
		<option value="Medium">Средний</option>
		<option value="Low">Низкий</option>
	</select>
	<span class="list__button">
		<button class="edit border" >
			<img src="images/icon-edit.png" id="editTask" alt="">
		</button>
		<button class="delete border">
			<img src="images/icon-delete.png" id="deleteTask" alt="">
		</button>
	</span>
	</li>
	`;

	taskElement.addEventListener('click', (event) => {
		if (event.target.id === 'toggleTask') {
			toggleTask(task);
		} else if (event.target.id === 'deleteTask') {
			deleteTask(task);
		} else if (event.target.id === 'editTask') {
			editTask(task);
		}
		
	})


	listBox.appendChild(taskElement);
}

function renderTasks() {
	listBox.innerHTML = '';

	taskList.forEach((task) => renderTask(task));
}

function toggleTask(task) {
	task.checked = !task.checked;

	renderTasks();
}

function deleteTask(task) {
	taskList.splice(taskList.indexOf(task), 1);

	renderTasks();
}

function editTask(task) {
	inputTask.value = task.title;

	taskList.splice(taskList.indexOf(task), 1);
	renderTasks();
}