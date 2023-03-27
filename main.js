const todo = document.getElementById("todo");
const input = todo.querySelector("#input")
const itemContainer = document.getElementById("items")

let toDoList = [];

todo.addEventListener('submit', function(event) {
  event.preventDefault();
  addToDo()
});

if (!toDoList.length) {
  // display empty blah blah blah
}

// adds a to do object to the array
function addToDo() {

  // get the input value
  const val = input.value;

  // if the value is empty
  if (val == '') {
    alert('The task was empty: Please input a task')
    return;
  }
  
  // if the value is contained in the array (not case sensitive)
  if (toDoList.some(elem => elem.id.toUpperCase() === val.toUpperCase())) {
    alert('This task already exists')
    return;
  }

  // create the object with the input value and the checked value
  const object = {
    input: val,
    checked: false
  }

  elem = addElem(object);
  toDoList.push(elem);
  
  // reset the input value
  input.value = '';

  // log the list
  console.log(toDoList);
}

// adds the to do object to the HTML
function addElem(data) {
  const elem = document.createElement("div");
  elem.setAttribute('id', data.input);
  elem.setAttribute('class', 'item unchecked');
  itemContainer.appendChild(elem);
  elem.classList.add("item");

  let itemContent = [
    {type: "h6", text: data.input, class: 'label', function: ''},
    {type: "button", text: 'DEL', class: 'delete', function: 'delete'},
    {type: "button", text: 'CHECK', class: 'checkbox', function: 'check'}
  ]

  createElemChildren(elem, itemContent);
  
  return elem;
}

function createElemChildren(elem, content) {
  
  for (var i = 0; i < content.length; i++) {
    const child = document.createElement(content[i].type);
    child.setAttribute('class', content[i].class);
    child.textContent += content[i].text;
    elem.appendChild(child);

    if (content[i].function == 'delete') {
      child.addEventListener('click', function() {
        let index = toDoList.findIndex(element => element.id == content[0].text);
        toDoList.splice(index, 1);
        elem.parentNode.removeChild(elem);
        console.log(toDoList);
      })
    }

    else if (content[i].function == 'check') {
      child.addEventListener('click', function() {
        if (elem.className == 'item unchecked') {
          elem.setAttribute('class', 'item checked');
        }
        else { elem.setAttribute('class', 'item unchecked') };
      })
    }
    
  }
}