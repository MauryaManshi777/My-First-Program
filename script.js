const List = document.querySelector('.List')
const item = document.querySelector('.item')
const addBtn = document.querySelector('#addBtn')
const inputText = document.querySelector('#inputText')


const getData = () => {
    const data = localStorage.getItem('todos') || []
    const todos = data.length > 0 ? JSON.parse(data) : []
    return todos
}

const addToDb = (id, content) => {
    const todos = getData()
    todos.push({ id: id, content: content })
    localStorage.setItem("todos", JSON.stringify(todos))
}

const renderItem = (id, content) => {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const div2 = document.createElement('div')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')

    div.setAttribute("itemId", id)


    btn1.innerText = 'Delet'
    btn2.innerText = 'Edit'
    p.innerText = content

    btn1.classList.add('Delet')
    btn2.classList.add('edit')

    btn1.addEventListener('click', deleteItem)
    btn2.addEventListener('click', editItem)

    div2.appendChild(btn1)
    div2.appendChild(btn2)

    div.classList.add("item")
    div.appendChild(p)
    div.appendChild(div2)

    List.appendChild(div)

}


const renderItems = () => {
    const todos = getData()
    List.innerHTML = ''
    todos.forEach(todo => renderItem(todo.id, todo.content))
}



const deleteItem = (e) => {
    const id = e.target.parentElement.parentElement.getAttribute('itemId')
    e.target.parentElement.parentElement.remove()
    const todos = getData()
    const newtodos = todos.filter(todo => todo.id != id)
    localStorage.setItem("todos", JSON.stringify(newtodos))

}

const UpdateItem = (id) => {
    const todos = getData()
    todos.forEach(todo => {
        if (todo.id == id) {
            todo.content = inputText.value
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    renderItems()

    inputText.value = ''

    addBtn.innerText = 'Add Item'
    addBtn.removeEventListener('click', UpdateItem)
    addBtn.addEventListener('click', newItem)

}

const newItem = () => {

    const value = inputText.value
    if (value === '') {
        alert('Kuch Likh Tab Enter Kar')
        return
    }

    const div = document.createElement('div')
    const p = document.createElement('p')
    const div2 = document.createElement('div')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')

    const count = document.querySelectorAll('.item').length + 1

    addToDb(count, value)

    inputText.value = ''

    renderItems()

}

const editItem = (e) => {
    const id = e.target.parentElement.parentElement.getAttribute('itemId')
    const text = e.target.parentElement.previousElementSibling.innerText;
    inputText.value = text
    addBtn.innerText = 'Update'
    addBtn.removeEventListener('click', newItem)
    addBtn.addEventListener('click', () => {
        UpdateItem(id)
    })

}
addBtn.addEventListener('click', newItem)

renderItems()
const LoadData = () => {
    alert("js chal raha h")
    console.log("ABHI CALL HO RAHA HAI")
    fetch("https://jsonplaceholder.typicode.com/photos")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
LoadData()