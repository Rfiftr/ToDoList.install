let recyclinTasks = { tasks: [] }


const menuContainer = document.querySelector('.menu')
const menuButton = document.querySelector('.menu-button')
const listRecyclingContainer = document.querySelector('.list-recycling')



menuButton.addEventListener('click', () => {
    menuContainer.style.display = menuContainer.style.display === 'block' ? 'none' : 'block'
})


// פונקציה ליבוא הנתונים השמורים למערך
window.addEventListener('load', () => {
    const storeData = localStorage.getItem('todoList')
    if(storeData) {
        recyclinTasks = JSON.parse(storeData)
    }
    console.log(recyclinTasks)
    setupUi()
})


function saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(recyclinTasks))
}


function removeItem(index) {
    recyclinTasks.tasks.splice(index, 1)
    saveToLocalStorage()
    setupUi()
}

function cameBackItem(index) {
    recyclinTasks.tasks[index].isRecycled = false
    saveToLocalStorage()
    setupUi()
    alert('משימה שוחזרה בהצלחה')
}


function setupUi() {
    listRecyclingContainer.innerHTML = ''

    recyclinTasks.tasks.map((item, index) => {
        if (item.isRecycled) {
            const itemElement = document.createElement('div')
            itemElement.classList.add('item')
        
            const itemButtons = document.createElement('div')
            itemButtons.classList.add('item-buttons')
        
            const itemRemoveButton = document.createElement('button')
            itemRemoveButton.textContent = 'מחק'
            itemRemoveButton.classList.add('item-remove-button')
            itemRemoveButton.addEventListener('click', () => removeItem(index))
        
            const itemRecyclingButton = document.createElement('button')
            itemRecyclingButton.textContent = 'שחזר'
            itemRecyclingButton.classList.add('item-recycling-button')
            itemRecyclingButton.addEventListener('click', () => cameBackItem(index))

            const itemTitle = document.createElement('p')
            itemTitle.textContent = item.title
            itemTitle.classList.add('item-title')
        
            itemButtons.appendChild(itemRemoveButton)
            itemButtons.appendChild(itemRecyclingButton)
            itemElement.appendChild(itemButtons)
            itemElement.appendChild(itemTitle)
            listRecyclingContainer.appendChild(itemElement)
        }
    })
}