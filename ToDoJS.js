var $ = function(sel) {
    return document.querySelector(sel);
};
var $All = function(sel) {
    return document.querySelectorAll(sel);
};
var guid = 0;
var CL_COMPLETED = 'completed';
var CL_SELECTED = 'selected';
var DEBUG=true;
var todaytodos=[];

function update() {
    let items = $All('.todo-list li');
    if (DEBUG&&items.length>0) console.log(items[0].innerText);
    let filter = $('.filters li a.selected').innerHTML;
    let leftNum = 0;
    let item, i, display;

    todaytodos=[];

    for (i = 0; i < items.length; ++i) {
        item = items[i];
        if (!item.classList.contains(CL_COMPLETED)) leftNum++;

        // 设置todayTodos
        todaytodos.push({
            message:item.innerText,
            completed:item.classList.contains(CL_COMPLETED),
            date:new Date().toLocaleDateString()
        });

        // filters
        display = 'none';
        if (filter == 'All'
            || (filter == 'Active' && !item.classList.contains(CL_COMPLETED))
            || (filter == 'Completed' && item.classList.contains(CL_COMPLETED))
        ) {
            display = 'block';
        }
        item.style.display = display;
    }

    if (DEBUG) console.log(todaytodos);

    let completedNum = items.length - leftNum;
    let count = $('.todo-count');
    count.innerHTML = (leftNum || 'No') + (leftNum > 1 ? ' items' : ' item') + ' left';

    let clearCompleted = $('.clear-completed');
    if (completedNum>0) {
        clearCompleted.style.display="inline";
    }
    else {
        clearCompleted.style.display="none";
    }
}

function addTodo(message,completed) {
    let todoList = $('.todo-list');

    let item = document.createElement('li');
    let id = 'item' + guid++;
    item.setAttribute('id', id);
    item.innerHTML = [
        '<div class="view">',
        '  <input class="toggle" type="checkbox">',
        '  <label class="todo-label">' + message + '</label>',
        '  <button class="destroy"></button>',
        '</div>'
    ].join('');

    item.querySelector('.toggle').addEventListener('change', function() {
        CompleteTodo(id, this.checked);
    });

    item.querySelector('.destroy').addEventListener('touchend', function() {
        removeTodo(id);
    });

    todoList.insertBefore(item, todoList.firstChild);

    CompleteTodo(id,completed);

    update();
}

function CompleteTodo(itemId, completed) {
    let item = $('#' + itemId);
    if (completed) item.classList.add(CL_COMPLETED);
    else item.classList.remove(CL_COMPLETED);
    let toggle=item.querySelector('.toggle').checked=completed;
    update();
}

function removeTodo(itemId) {
    let todoList = $('.todo-list');
    let item = $('#' + itemId);
    todoList.removeChild(item);
    update();
}

function clearCompletedTodoList() {
    let todoList = $('.todo-list');
    let items = todoList.querySelectorAll('li');
    for (let i = items.length - 1; i >= 0; --i) {
        let item = items[i];
        if (item.classList.contains(CL_COMPLETED)) {
            todoList.removeChild(item);
        }
    }
    update();
}

function setDate(date) {
    //获取当前日期并显示
    if (DEBUG) console.log(date);
    const monthEnglish=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SPT","OCT","NOV","DEC"];
    let month=monthEnglish[date.getMonth()];
    let day=date.getDate();
    if (DEBUG) console.log(day);
    document.getElementById("date").innerText=day;
    document.getElementById("month").innerText=month;
}

window.onload = function init() {

    let date = new Date();
    //设置头部日期
    setDate(date);

    //读取浏览器保存的数据
    let todos = localStorage.getItem("todos");
    if (DEBUG) console.log(todos);
    if (todos!=null) todos=JSON.parse(todos);
    else todos=[];

    // 初始化添加今日列表
    for (let i=0;i<todos.length;i++) {
        if (DEBUG) 
            console.log("todos[i].date === date.toLocaleDateString()结果是",
            todos[i].date === date.toLocaleDateString());
        if (todos[i].date === date.toLocaleDateString()) {
            addTodo(todos[i].message,todos[i].completed);
        }
    }

    //添加Todos
    var newTodo = $('.new-todo'); // todo
    newTodo.addEventListener('keyup', function(ev) {
        // Enter
        if (ev.keyCode != 13) return;

        var message = newTodo.value;
        if (message == '') {
            console.warn('message is empty');
            return;
        }

        addTodo(message);
        newTodo.value = '';
    });

    var clearCompleted = $('.clear-completed');
    clearCompleted.addEventListener('touchend', function() {
        clearCompletedTodoList();
    });

    var filters = $All('.filters li a');
    for (var i = 0; i < filters.length; ++i) {
        (function(filter) {
            filter.addEventListener('touchend', function() {
                for (var j = 0; j < filters.length; ++j) {
                    filters[j].classList.remove(CL_SELECTED);
                }
                filter.classList.add(CL_SELECTED);
                update();
            });
        })(filters[i])
    }

    update();
};

window.onbeforeunload = function () {
    localStorage.setItem("todos",JSON.stringify(todaytodos));
}
