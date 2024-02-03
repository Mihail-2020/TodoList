const inputTask = document.querySelector('#inputTask');
const addButton = document.querySelector('#add__button');
const listBox = document.querySelector('#list__box');
const errorMessage = document.querySelector('.row__error');
const optionMenu = document.querySelector('.status__menu'),
		statusOption = document.querySelectorAll('.statis__option'),
		options = document.querySelectorAll('.option'),
		statusText = document.querySelector('.status__text');



statusOption.forEach(status => {
	status.addEventListener('click', () => optionMenu.classList.toggle('active'));
})
// statusOption.addEventListener('click', () => optionMenu.classList.toggle('active'));

options.forEach(option => {
	option.addEventListener('click', () => {
		const selectOption = option.querySelector('.option__text').innerText;
		statusText.innerText = selectOption;

		optionMenu.classList.remove('active');
	})
})

const taskList = [];

statusText.innerText = 'Статус';

addButton.addEventListener('click', addTask);

function addTask() {
	errorMessage.innerText = '';

	if (inputTask.value === '') {
		errorMessage.innerText = 'Введите пожалуйста задачу!!!';
	} else if (statusText.innerText === 'Статус') {
		taskList.push({
			title: inputTask.value,
			checked: false,
			status: '',
		});
		inputTask.value = '';
		statusText.innerText = 'Статус';
		renderTasks();
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
	const taskElement = document.createElement('li');
	taskElement.classList.add('list__item', 'toggleTask');

	if (task.checked) {
		taskElement.classList.add('checked');
	}

	taskElement.innerHTML = `
	<span class="list__task">
		${task.title}
	</span>
	<span class="list__status" >
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
	</div>
	`;

	taskElement.addEventListener('click', (event) => {
		if (event.target.className === 'delete__task') {
			deleteTask(task);
		} else if (event.target.className === 'edit__task') {
			myModal.classList.add('open');
			editTask(task);
		} else {
			toggleTask(task);
		}
	})

	listBox.appendChild(taskElement);
}

function renderTasks() {
	listBox.innerHTML = '';
	localStorage.setItem('Task', JSON.stringify(taskList))

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
