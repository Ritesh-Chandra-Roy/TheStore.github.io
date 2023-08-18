
const addToCart = document.querySelectorAll('.product-item__add-btn')
addToCart.forEach((button) => {
    button.addEventListener('click', checkCart)
})

var singleton = (function () {

    let Basket;
    function createBasket() {
        let object = {
            productList: [],
            total: 0,
            calculateTotal: function () {
                this.total = 0;
                this.productList.forEach((product) => {
                    this.total += product.totalPrice;
                })
            }
        }
        return object;
    };
    return {

        getBasket: function () {
            console.log(Basket);
            if (!Basket) {
                console.log("created");
                Basket = createBasket();
            } else {
                console.log('Basket already exists!')
            }
            return Basket;
        }
    }
})();

console.log(singleton.getBasket);

let basket1 = singleton.getBasket();

/**
 * 
 * @param {string} id - id of product 
 * @returns true if product alreadyChecked
 */
function alreadyChecked(id) {
    for (let i = 0; i < basket1.productList.length; i++) {
        cartItem = basket1.productList[i]
        if (cartItem.id == id) {
            cartItem.quantity += 1
            cartItem.totalPrice = cartItem.itemPrice * cartItem.quantity;
            return true;
        }
    }
    return false;
}


/**
 * @param {}
 * @return {}
 * will get triggered when addToCart button is clicked.
 * add product to cart/incrimrnt product quantity
 * calculateTotal price of cart
 */
function checkCart() {
    console.log("Checking cart...");
    const product = this.parentNode
    let id = product.id
    if (!alreadyChecked(id)) {
        let name = product.querySelector('.product-item__name').innerHTML
        let price = parseFloat(product.querySelector('.product-item__price').innerHTML.substring(1))
        console.log(price)
        let quantity = 1;
        const item = new Product(id, name, quantity, price)
        basket1.productList.push(item)
        console.log('New Product Added!!')
    } else {
        console.log('Product Quantity Increamented!!')
    }
    basket1.calculateTotal();
    console.log("Total amount: " + basket1.total);
}
/**
 * 
 * @param {string} quantityid 
 * @param {string} name 
 * @param {string} quantity 
 * @param {string} item_price 
 */
function Product(id, name, quantity, item_price) {
    this.id = id
    this.name = name
    this.quantity = quantity
    this.itemPrice = item_price
    this.totalPrice = item_price * quantity
}