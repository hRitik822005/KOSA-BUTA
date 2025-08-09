document.addEventListener("DOMContentLoaded", displayCart)

function displayCart () {
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    cartList.forEach((cartItem) => {
        const cartDetail = document.querySelector("#cart-container");
        cartDetail.innerHTML += `
            <div class="cart-details">
                <div class="left-section">
                <img src="${cartItem.product.image}" alt="${cartItem.product.name}" class="cart-img">
                <div class="cart-updation">
                    <button class="decrease-btn" data-id="${cartItem.product.id}">-</button>
                    <div class="box"><p>${cartItem.quantity}</p></div>
                    <button class="increase-btn" data-id="${cartItem.product.id}">+</button>
                </div>
                </div>
                <div class="right-section">
                <div class="product-name">${cartItem.product.name}</div>
                <div class="product-price">Price: ${cartItem.product.price}</div>
                <button class="remove-btn" data-id="${cartItem.product.id}">Remove</button>
                </div>
            </div>
        `;
        });

        // Add event listeners for quantity buttons
        document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(this.dataset.id, 1);
        });
        });
        document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(this.dataset.id, -1);
        });
        });
        document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(this.dataset.id);
        });
        });

        function updateQuantity(productId, change) {
        let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
        cartList = cartList.map(item => {
            if (item.product.id == productId) {
            item.quantity = Math.max(1, item.quantity + change);
            }
            return item;
        });
        localStorage.setItem('cartList', JSON.stringify(cartList));
        location.reload();
        }

        function removeFromCart(productId) {
        let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
        cartList = cartList.filter(item => item.product.id != productId);
        JSON.stringify(localStorage.setItem('cartList', cartList));
        location.reload();
        }
    };

// Price Section
const priceNum = document.querySelector('.price-num');
const totalPrice = document.querySelector('.total-amount-price');

// Calculate total from cartList
const cartList = JSON.parse(localStorage.getItem('cartList')) || [];

const total = cartList.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity), 0);

if (priceNum) {
    priceNum.innerHTML += `
                        <p>${total}</p>
                        <p>-$1</p>
                        <p>$0.19</p>        
    `;
}

const finalAmount = total - 1 + 0.19;
if (totalPrice) {
    totalPrice.textContent = `$${finalAmount.toFixed(2)}`;
}
