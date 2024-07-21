const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const inputInvalid = document.getElementById('input-invalid');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('items-clear');
const searchInput = document.getElementById('filter');

function checkUI() {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0){
        clearBtn.style.display = 'none';
        searchInput.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        searchInput.style.display = 'block';
    }
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

    const li = document.createElement('li');
    li.textContent = newItem;

    const icon = document.createElement('i');
    icon.className = 'fa fa-x';
    icon.id = 'remove-item'

    li.appendChild(icon);
    itemList.appendChild(li);

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

checkUI();
