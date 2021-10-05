const todos = [{
    text: 'Order cat food',
    completed: false
}, {
    text: 'Clean kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: true
}, {
    text: 'Do work',
    completed: false
}, {
    text: 'Exercise',
    completed: true
}]

const filters = {
    searchText: '' ,
    hideCompleted : false
}

const renderTodos = function (todos, filters) {
    let filteredTodos = todos.filter(function (todo) {
        searchTextMatch=todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        hideCompletedMatch=!filters.hideCompleted || !todo.completed
        return searchTextMatch & hideCompletedMatch
    })
    // filteredTodos=filteredTodos.filter(function(todo){
    //     if(filters.hideCompleted){
    //         return !todo.completed
    //     } else {
    //         return true
    //     }
    // })


    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)

    filteredTodos.forEach(function (todo) {
        const p = document.createElement('p')
        p.textContent = todo.text
        document.querySelector('#todos').appendChild(p)
    })
}

renderTodos(todos, filters)

// Listen for new todo creation
document.querySelector('#add-todo').addEventListener('click', function (e) {
    console.log('todo added')
})

// Listen for todo text change
document.querySelector('#new-todo-text').addEventListener('input', function (e) {
    console.log(todos.text)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#formname').addEventListener('submit',function(e){
    e.preventDefault()
    todos.push({
        text : e.target.elements.name.value,
        completed : false
    })
    renderTodos(todos, filters)
    e.target.elements.name.value=''
})

document.querySelector('#checked').addEventListener('change',function(e){
    if(e.target.checked){
        filters.hideCompleted = true
    }else{
        filters.hideCompleted=false
    } // == filters.hideCompleted = e.target.checked

    renderTodos(todos, filters)
    // if(this.checked){
    //     console.log('checked')
    // }else{
    //     console.log('not checked')
    // }
})
