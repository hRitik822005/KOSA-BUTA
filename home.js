import products  from './proddetails.js'

document.addEventListener('DOMContentLoaded', renderProductList) 

function renderProductList () {
      const productContainer = document.querySelector(".product-grid");
      products.forEach(product => {
        productContainer.innerHTML += `
            <div class="product-item" id="product-item-${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <a href="./productdetails.html" class="buy-btn">Price ${product.price}</a>
            </div>
        `
      })
      const productItems = document.querySelectorAll('.product-item');
      productItems.forEach(item => {
        item.addEventListener('click', () => {
            const productId = item.id.split('-')[2]; // Extract product id from the item id
            const product = products.find(p => p.id == productId);
            handleProductClick(product);
            window.location.href = './productdetails.html'; // Redirect to product details page
        });
      })
}

function handleProductClick(product) {
    localStorage.setItem('selectedProductId', product.id);
}




/*
1. On click opens details page
2. On click stores product id in localStorage 
*/