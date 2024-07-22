const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const inputInvalid = document.getElementById('input-invalid');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('items-clear');
const searchInput = document.getElementById('filter');
const editBtn = itemForm.querySelector('button');
let isEditMode = false;

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

function removeItemFromStorage(item) {
    let storageItems = getItemsFromStorage();

    storageItems = storageItems.filter((content) => content !== item);
    localStorage.setItem('items', JSON.stringify(storageItems));
}

function removeItem(item) {
    item.remove();
    removeItemFromStorage(item.textContent);
    checkUI();
}

function selectItemToEdit(selectedItem) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'));
    selectedItem.classList.add('edit-mode');

    itemInput.value = selectedItem.textContent;

    editBtn.style.backgroundColor = 'rgb(28, 74, 175)';
    editBtn.innerHTML = '<i class="fa fa-pen"> </i> Update item';
}

function checkIfItemExists(item) {
    const itemsFromStorge = getItemsFromStorage();

    return itemsFromStorge.includes(item);
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

    if (isEditMode) {
        const selectedItem = itemList.querySelector('.edit-mode');

        removeItemFromStorage(selectedItem.textContent);
        selectedItem.remove();
        editBtn.innerHTML = "<i class='fa fa-plus'></i> Add Item";
        editBtn.style.backgroundColor = 'rgb(56, 56, 56)';

        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            inputInvalid.innerText = 'This item already exists!';
            return;
        } else {
            inputInvalid.innerText = '';
        }
    }

    createItem(newItem);
    addItemToStorage(newItem);

    itemInput.value = '';

    checkUI();
});

itemList.addEventListener('click', (e) => {
    if (e.target.id === 'remove-item' && e.target.classList.contains('fa-x')) {
        removeItem(e.target.parentElement);
    } else {
        selectItemToEdit(e.target);
    }
});

clearBtn.addEventListener('click', () => {
    itemList.innerHTML = '';
    localStorage.removeItem('items');

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
