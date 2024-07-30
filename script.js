//Elements of interest
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

//functions
const addItem = (e) => {
    e.preventDefault();

    //inputValue
    const newItem = itemInput.value;

    //Validate input
    if (itemInput.value === '') {
        alert('Please provide a valid input');
        return;
    }

    //Create a list item
    const newListItem = document.createElement('li');
    //add inputValue to the newly created list item
    newListItem.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');

    newListItem.appendChild(button);

    itemList.appendChild(newListItem);

    itemInput.value = '';
};

const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIElement('fa-solid fa-xmark');

    button.appendChild(icon);

    return button;
};

const createIElement = (classes) => {
    const iElement = document.createElement('i');
    iElement.className = classes;
    return iElement;
};

//eventListeners
itemForm.addEventListener('submit', addItem);
