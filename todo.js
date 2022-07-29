let $ = document;

const inputElem = $.getElementById('itemInput');
const addButton = $.getElementById('addButton');
const clearButton = $.getElementById('clearButton');
const todoListElem = $.getElementById('todoList');

let todosArray = [];

inputElem.focus();

function addNewTodo() {

    let newTodoTitle = inputElem.value;

    if (newTodoTitle === '') {
        console.log('Cute :)');
    }
    else {
        let newTodoObj = {
            id: todosArray.length + 1,
            title: newTodoTitle,
            complete: false,
        }

        inputElem.value = '';

        todosArray.push(newTodoObj);
        setLocalStorage(todosArray);
        todosGenerator(todosArray);

        inputElem.focus();

        // console.log(todosArray);
        // console.log(newTodoTitle);
    }
}

function setLocalStorage(todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList));
}

function todosGenerator(todosList) {
    let newTodoLiElem, newTodoLabelElem, newTodoCompleteBtn, newTodoDeleteBtn;

    // todoListElem.innerHTML = '';
    todosList.forEach(function (todo) {
        console.log(todo);

        newTodoLiElem = $.createElement('li');
        newTodoLiElem.className = 'completed well';
        // console.log(newTodoLiElem);

        newTodoLabelElem = $.createElement('label');
        newTodoLabelElem.innerHTML = todo.title;
        // console.log(newTodoLabelElem);

        newTodoCompleteBtn = $.createElement('button');
        newTodoCompleteBtn.className = 'btn btn-success';
        newTodoCompleteBtn.innerHTML = 'Complete';
        newTodoCompleteBtn.setAttribute('onclick', 'editTodo(' + todo.id + ')');

        newTodoDeleteBtn = $.createElement('button');
        newTodoDeleteBtn.className = 'btn btn-danger';
        newTodoDeleteBtn.innerHTML = 'Delete';
        newTodoDeleteBtn.setAttribute('onclick', 'removeTodo(' + todo.id + ')');

        if (todo.complete) {
            newTodoLiElem.className = 'uncompleted well';
            newTodoCompleteBtn.innerHTML = 'unComplete';
        }
        newTodoLiElem.append(newTodoLabelElem, newTodoCompleteBtn, newTodoDeleteBtn);
        todoListElem.append(newTodoLiElem);
        // console.log(newTodoLiElem);
    });
}

function editTodo(todoId) {
    console.log('id : ' + todoId);

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));

    todosArray = localStorageTodos;

    todosArray.forEach(function (todo) {

        if (todo.id === todoId) {
            todo.complete = !todo.complete;
        }
    });
    setLocalStorage(todosArray);
    todosGenerator(todosArray);
}

function removeTodo(todoId) {
    console.log('id : ' + todoId);

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));

    todosArray = localStorageTodos;

    let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId;
    });
    todosArray.splice(mainTodoIndex, 1);

    setLocalStorage(todosArray);
    todosGenerator(todosArray);

    console.log('index : ' + mainTodoIndex);
    // console.log(localStorageTodos);
    console.log(todosArray);
}

function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));

    if (localStorageTodos) {
        todosArray = localStorageTodos;
    }
    else {
        todosArray = [];
    }
    todosGenerator(todosArray);
    // console.log(localStorageTodos);
}

function clearTodos() {
    todosArray = [];
    todosGenerator(todosArray);

    // localStorage.clear();
    localStorage.removeItem('todos');
}

window.addEventListener('load', getLocalStorage);
addButton.addEventListener('click', addNewTodo);
clearButton.addEventListener('click', clearTodos);

inputElem.addEventListener('keydown', function (event) {
    // console.log(event);
    if (event.code === 'Enter') {
        addNewTodo();
    }
    else if (event.code === 'Escape') {
        inputElem.blur();
    }
});

document.addEventListener('keydown', function (event) {
    // console.log(event);
    if (event.code === 'Enter') {
        inputElem.focus();
    }
});
