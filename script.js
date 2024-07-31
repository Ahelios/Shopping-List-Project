//Elements of interest
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

//functions

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
} 

const onAddItemSubmit = (e) => {
  e.preventDefault();

  //inputValue
  const newItem = itemInput.value;

  //Validate input
  if (itemInput.value === "") {
    alert("Please provide a valid input");
    return;
  }

  //Create item DOM element
  addItemToDOM(newItem);

  //Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
};

const addItemToDOM = (newItem) => {
  //Create a list item
  const newListItem = document.createElement("li");
  //add inputValue to the newly created list item
  newListItem.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  newListItem.appendChild(button);

  itemList.appendChild(newListItem);
}

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.push(item);

  //Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

const getItemsFromStorage = () => {
  let itemsFromStorage;

  if(localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;

  const icon = createIElement("fa-solid fa-xmark");

  button.appendChild(icon);

  return button;
};

const createIElement = (classes) => {
  const iElement = document.createElement("i");
  iElement.className = classes;
  return iElement;
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (window.confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
};

const clearItems = (e) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const checkUI = () => {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearAll.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearAll.style.display = "block";
    itemFilter.style.display = "block";
  }
};

//eventListeners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
itemList.addEventListener("click", removeItem);
clearAll.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
