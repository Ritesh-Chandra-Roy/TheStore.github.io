let itemsPerPage = document.getElementById("items-per-page");
let productList = document.getElementsByClassName('product-item');
let sizeFilter = document.getElementsByClassName('filters__size-swatch-link');
const itemList = document.querySelector('.product-list')
const item = document.querySelectorAll('.product-item')
let length = item.length;
let filterList = document.getElementsByClassName('filters__list-name')
document.getElementById('telegram').addEventListener('click', subscriptionService);
const lowStock = `<h4>Low Stock</h4>`
const highStock = `<h4>High Stock</h4>`
const notAvailable = `<h4>Not Available</h4>`
// ************************Funnctions are below************************

// Task #1 This Code is used to make Border Pink


for (let i = 0; i < productList.length; i++) {
    let childElem = productList[i].children;
    for (let j = 0; j < childElem.length; j++) {
        if ((childElem[j].classList.contains('product-item__badge')) && (childElem[j].innerHTML === 'Sale')) {
            productList[i].classList.add('on-sale')
        }
    }
}
// Task #2 This code is used to make even list elements blue bg.


for (let idx = 0; idx < sizeFilter.length; idx += 2) {
    let element = sizeFilter[idx];
    element.style.background = 'blue'
}

// Task #3 This code is used to make clone of last two elements.


for (let idx = 2; idx > 0; idx--) {
    let node = item[length - idx];
    let clone = node.cloneNode(true);
    itemList.appendChild(clone);
}


// Task #4 visibilitymade hidden for the Occasion Filter Item.

for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].innerText == 'Occasion') {
        filterList[i].parentElement.style.display = 'none';
    }
}

// Bonues Task: Display slected number of items per page..

function showItems(value) {
    for (let i = 6; i < value; i++) {
        productList[i].style.display = 'flex';
    }
    for (let i = value; i < productList.length; i++) {
        productList[i].style.display = 'none';
    }
}

itemsPerPage.onchange = function () { onChange() };
function onChange() {
    let value = parseInt(itemsPerPage.value);
    showItems(value);
}
onChange();

// Task 1+2+3 Assignment 5 (Add Items to Basket)

const tableBody = document.getElementById('added-item');    // Refer to the table body where the items have to be added
const addBtn = document.querySelectorAll('.product-item__add-btn');
const totalPriceColmn = document.getElementById('basket-total');
function Product(id, name, quantity, item_price) {
    this.id = id
    this.name = name
    this.quantity = quantity
    this.itemPrice = item_price
    // this.totalPrice = item_price * quantity
}
let basket = {
    itemList: [] = JSON.parse(localStorage.getItem('itemList')) || [],
    total: 0,
    calculateTotalPrice: function () {
        this.total = 0;
        this.itemList.forEach((product) => {
            x = product.quantity;
            y = product.itemPrice
            this.total += x * y;
        })
    }
}
fetchLocalStorage();
function alreadyChecked(itemId) {
    for (let i = 0; i < basket.itemList.length; i++) {
        if (basket.itemList[i].id == itemId) {
            basket.itemList[i].quantity += 1;
            return basket.itemList[i].quantity;
        }
    } return 0;
}
addBtn.forEach((element) => {
    element.addEventListener('click', function () {

        let product = this.parentElement
        let itemName;
        let itemPrice;
        let itemId = product.id;
        let quantity;
        if (quantity = alreadyChecked(itemId)) {
            console.log(quantity)
            let rows = document.getElementsByClassName('item-details')
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                if (row.children[0].innerText == itemId) {
                    row.children[4].innerHTML = quantity
                }
            }
            localStorage.setItem('itemList', JSON.stringify(basket.itemList))
        } else {
            quantity = 1;
            itemName = product.querySelector('.product-item__name').innerHTML
            itemPrice = parseFloat(product.querySelector('.product-item__price').innerHTML.substring(1))
            console.log(typeof (itemPrice))
            const item = new Product(itemId, itemName, quantity, itemPrice)
            basket.itemList.push(item);
            localStorage.setItem('itemList', JSON.stringify(basket.itemList))
        }
        fetchLocalStorage()

    });
})

function fetchLocalStorage() {
    let items = JSON.parse(localStorage.getItem('itemList')) || [];
    tableBody.innerHTML = ''
    totalPriceColmn.innerHTML = ''
    for (let i = 0; i < items.length; i++) {
        if (document.querySelector('.SNO') != null) {      // If basket contains items
            let serialNumbers = document.querySelectorAll('.SNO');      // Refer to the table cell which contains the serial numbers
            SNO = parseInt(serialNumbers[serialNumbers.length - 1].innerText) + 1  //Providing serial number to the added product
        }
        else {          // basket empty
            SNO = 1;
        }
        let content = `<tr class = 'item-details'> <td class = 'item-Id'> ${items[i].id} </td> <td class = 'SNO'>${SNO}</td> <td>${items[i].name}</td> <td>${items[i].itemPrice}</td>  <td>${items[i].quantity}</td> <td class = 'remove-btn' > <button onClick = "removeItem(this)"> Remove</button> </td> </tr>`    //inserting rows into the table
        tableBody.innerHTML += content;
    }
    basket.calculateTotalPrice();
    totalPriceColmn.innerHTML = `<tr> <th> Total: </th> <td colspan="4" align = "center"> ${basket.total} </td> </tr>`

}

function removeItem(btn) {
    const id = btn.parentElement.parentElement.children[0].innerText;
    basket.itemList.forEach((element, index) => {
        if (element.id === id) {
            basket.itemList.splice(index, 1);
        }
    })
    let serialNumbers = document.querySelectorAll('.SNO');
    let currentItemNumber = btn.parentElement.parentElement.children[1].innerText;
    serialNumbers.forEach((column) => {
        if (column.innerText > 1 && column.innerText > currentItemNumber) {
            column.innerText -= 1
        }
    })
    btn.parentElement.parentElement.remove()
    localStorage.setItem('itemList', JSON.stringify(basket.itemList))
    fetchLocalStorage();
}


// ******************************************Assignment7 Task 1********************************

// ******************************************************AJAX*********************************************** 

// addMessageSection() will add a section in the product tile to display availability information
function addMessageSection() {
    let tile = document.querySelectorAll('.product-item')
    tile.forEach((element) => {
        let availableMessage = document.createElement('div');
        availableMessage.className = 'availableMessage';
        availableMessage.innerHTML = '<h5>Loading....</h5>';
        element.appendChild(availableMessage);
    })
}

addMessageSection();

// showAvailability() This function is used to make XMLHttpRequest to the server and fetch the JSON response for product stock availability.

function showAvailability() {
    const url = 'https://jsbootcamp.ontrq.com/php/availability/';


    let msgSection = document.getElementsByClassName('availableMessage')

    Array.from(msgSection).forEach((product_tile) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.onreadystatechange = function () {

            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let response = JSON.parse(xhttp.response);
                let x = response.availability
                // product_tile.innerHTML = notAvailable;
                if (x == 0) {
                    product_tile.innerHTML = notAvailable
                }
                else if (x <= 20) {
                    product_tile.innerHTML = `<h5>Hurry up! just ${x} items left.</h5>`
                }
                else if (x <= 100) {
                    product_tile.innerHTML = lowStock
                }
                else {
                    product_tile.innerHTML = highStock
                }


            } else {
                product_tile.innerHTML = notAvailable
            }

        }
        xhttp.send();
    });
}
showAvailability() //calling the function to show availability of items

// ******************************************Assignment7 Task 2********************************

// function to validate the entered email using regex
function validateEmail() {

    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.value.match(mailformat)) {
        this.style.border = '5px solid green'
    } else {
        this.style.border = '5px solid red'
    }

}



// findInput() This function will get the mailBox.
function findInput() {
    const input = document.querySelectorAll('input');
    input.forEach((mailBox) => {
        if ((mailBox.hasAttribute('placeholder')) && (mailBox.placeholder == 'Enter your Email Address')) {
            mailBox.addEventListener('change', validateEmail);
        }
    })
}
findInput()

// subscriptionService() This function is used to make XMLHttpRequest to the server and display the subscription response.
// subscriptionService() will get triggered when the submit button is clicked

function subscriptionService() {
    const url = 'https://jsbootcamp.ontrq.com/php/subscribe/';
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            document.getElementById('responseContent').innerHTML = data.name;
        }
    };
    let mail = document.querySelector('.mail').value
    xhttp.open('GET', url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "email": mail, "response": { "name": "Tester" } }))
}

// ****************************************************END************************************************************


