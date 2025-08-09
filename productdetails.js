import products  from './proddetails.js'

document.addEventListener('DOMContentLoaded', displayProductDetails)

function displayProductDetails() {
    const productId = localStorage.getItem('selectedProductId');
    const product = products.find(p => p.id == productId);
    
    if (product) {
        // Display product details 
        document.querySelector('.product-img').src = product.image;
        document.querySelector('.product-img').alt = product.name;
        document.querySelector('.product-name').textContent = product.name;
        document.querySelector('.price-tag').textContent = `Price: ${product.price}`;
    } else {
        console.error('Product not found');
        return;
    }
}

// Open the products section page in index.html
const productViewLink = document.querySelector('#product-view');
if (productViewLink) {
  productViewLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html#product-section';
  });
}



// Adding products to cart page
const addBtn = document.querySelector("#add-to-cart");
addBtn.addEventListener('click', () => {
  const productId = localStorage.getItem('selectedProductId');
  const product = products.find(p=> p.id == productId);

   if(product === null) {
    return;
   } 

    // Getting existing products list from local storage
    // let cartList = localStorage.getItem('cartList');
    // if(cartList !== null) {
    //   cartList = JSON.parse(cartList);
    // } else {
    //   cartList = [];
    // }
    

    // let cartList = JSON.parse(localStorage.getItem('cartList')) || [];

    let cartList;
    try {
      cartList = JSON.parse(localStorage.getItem('cartList')) || [];
      if (!Array.isArray(cartList)) cartList = [];
    } catch (e) {
      cartList = [];
    }

    // Check if product already exists in cart
    const existingProduct = cartList.find(item => item.product.id == product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartList.push({
        product,
        quantity: 1
      });
    }

    // Setting updated products list into local storage
    localStorage.setItem('cartList', JSON.stringify(cartList));
    alert("Product added to cart");

    // On btn click open cart.html
    window.location.href = 'cart.html';
})


// Access buy now button

document.getElementById('buy-now').addEventListener('click', () => {
    const product = {
        name: document.querySelector('.product-name').textContent,
        price: document.querySelector('.price-tag').textContent,
        image: document.querySelector('.product-img').getAttribute('src')
    };

    localStorage.setItem('selectedProduct', JSON.stringify(product));

    // Redirect to buynow.html
    window.location.href = 'buynow.html';
});
