const input = document.querySelector('input');
const submitBtn = document.querySelector('button');
const todoList = document.querySelector('.todoList');

function getTodoList() {
    let getStorage = JSON.parse(localStorage.getItem('todoList'));
    if (getStorage) {
        getStorage.forEach(value => {
            addTodoList(value);
        })
    }
}
getTodoList();

function saveTodoList() {
    const items = todoList.querySelectorAll('li');
    let setStorage = Array.from(items).map(item => {
        let text = item.querySelector('span').innerText;
        let status = item.getAttribute('class');

        return {
            text,
            status
        }
    })

    localStorage.setItem('todoList', JSON.stringify(setStorage));
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let value = input.value.trim();
    if (value) {
        addTodoList(
            {
                text: value
            }
        )
        saveTodoList();
    }
    input.value = '';
    input.focus();
})

function removeElement(li) {
    const removeBtn = li.querySelector('i');
    removeBtn.addEventListener('click', function () {
        this.parentElement.remove();
        saveTodoList();
    })
}

function toggleClick(li) {
    li.addEventListener('click', function () {
        this.classList.toggle('done');
        saveTodoList();
    })
}

function addTodoList(item) {
    let li = document.createElement('li');
    li.innerHTML = `<span>${item.text}</span>
                    <i class="fa-solid fa-trash"></i>`;

    if (item.status) {
        li.setAttribute('class', item.status);
    }
    
    toggleClick(li);
    removeElement(li);
    todoList.appendChild(li);
}