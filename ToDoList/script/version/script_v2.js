const inputTask = document.querySelector('#inputTask');
const addButton = document.querySelector('#add__button');
const listBox = document.querySelector('#list__box');
const optionMenu = document.querySelector('.status__menu'),
		statusOption = document.querySelector('.statis__option'),
		options = document.querySelectorAll('.option'),
		statusText = document.querySelector('.status__text');

statusOption.addEventListener('click', () => optionMenu.classList.toggle('active'));

options.forEach(option => {
	option.addEventListener('click', () => {
		const selectOption = option.querySelector('.option__text').innerText;
		statusText.innerText = selectOption;

		optionMenu.classList.remove('active');
	})
})

const taskList = [];

addButton.addEventListener('click', addTask);

function addTask() {
	if (inputTask.value === '') {
		alert('Введите пожалуйста задачу!!!');
	} else {
		taskList.push({
			title: inputTask.value,
			checked: false,
			status: statusText.innerText,
		});
		inputTask.value = '';
		statusText.innerText = 'Статус';
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
	<span class="list__task" id="toggleTask">
		${task.status}
	</span>
	<span class="list__button">
		<button class="edit border" >
			<img src="images/icon-edit.png" class="edit__task" alt="">
		</button>
		<button class="delete border">
			<img src="images/icon-delete.png" class="delete__task" alt="">
		</button>
	</span>
	</li>
	`;

	taskElement.addEventListener('click', (event) => {
		if (event.target.id === 'toggleTask') {
			toggleTask(task);
		} else if (event.target.className === 'delete__task') {
			deleteTask(task);
		} else if (event.target.className === 'edit__task') {
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
	statusText.innerText = task.status;

	taskList.splice(taskList.indexOf(task), 1);
	renderTasks();
}