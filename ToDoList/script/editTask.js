const inputEdit = document.querySelector('#inputEdit');
const buttonEdit = document.querySelector('#buttonEdit');
const editMenu = document.querySelector('.edit__menu'),
        statusEditOption = document.querySelectorAll('.edit__option'),
        editText = document.querySelector('.edit__text'),
        editOptions = document.querySelectorAll('.edit-option');


statusEditOption.forEach(status => {
    status.addEventListener('click', () => editMenu.classList.toggle('active'));
})

editOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectOption = option.querySelector('.edit-option__text').innerText;
        editText.innerText = selectOption;

        editMenu.classList.remove('active');
    })
})

const modalOpenButton = document.querySelector('#modal__btn'),
		myModal = document.querySelector('#my__modal'),
		modalBtnClose = document.querySelector('#modal__btn-close');




// window.addEventListener('keydown', (event) => {
// 	if (event.key === 'Escape') {
// 		myModal.classList.remove('open')
// 	}
// })

// myModal.addEventListener('click', (event) => {
// 	if (event.target.id === 'my__modal') {
// 	   myModal.classList.remove('open');
// 	}
//   });


function editTask(task) {
    const taskTitle = task.title;
    const taskStatus = task.status;

    inputEdit.value = taskTitle;
    editText.innerText = taskStatus;

    buttonEdit.addEventListener('click', eventButtonEdit)
    function eventButtonEdit() {
        task.title = inputEdit.value;
        task.status = editText.innerText;

        myModal.classList.remove('open');

        renderTasks();
        buttonEdit.removeEventListener('click', eventButtonEdit)
    }
}