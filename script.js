const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const inputInvalid = document.getElementById('input-invalid');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('items-clear');
const searchInput = document.getElementById('filter');



function checkUI() {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        searchInput.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        searchInput.style.display = 'block';
    }
}

function createItem(item) {
    const li = document.createElement('li');
    li.textContent = item;

    const icon = document.createElement('i');
    icon.className = 'fa fa-x';
    icon.id = 'remove-item'

    li.appendChild(icon);
    itemList.appendChild(li);
}

function getItemsFromStorage() {
    let storageItems;

    if (localStorage.getItem('items') === null) {
        storageItems = [];
    } else {
        storageItems = JSON.parse(localStorage.getItem('items'));
    }

    return storageItems;
}

function addItemToStorage(item) {
    const storageItems = getItemsFromStorage();

    storageItems.push(item);
    localStorage.setItem('items', JSON.stringify(storageItems));
}



itemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newItem = itemInput.value;
    if (newItem == '') {
        inputInvalid.innerText = 'Please add an item!';
        return;
    } else {
        inputInvalid.innerText = '';
    }

    createItem(newItem);
    addItemToStorage(newItem);

    itemInput.value = '';

    checkUI();
});

itemList.addEventListener('click', (e) => {
    if (e.target.id === 'remove-item' && e.target.classList.contains('fa-x')) {
        e.target.parentElement.remove();
    }

    checkUI();
});

clearBtn.addEventListener('click', () => {
    itemList.innerHTML = '';

    checkUI();
});

searchInput.addEventListener('input', (e) => {
    const inputText = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(inputText) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const storageItems = getItemsFromStorage();
    storageItems.forEach(item => createItem(item));

    checkUI();
});

checkUI();
