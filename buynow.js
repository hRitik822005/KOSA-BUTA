document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!product) {
        document.getElementById('buy-container').innerHTML = '<p>No product selected.</p>';
        return;
    }

    // Extract numeric price from string like "Price: $100"
    const priceMatch = product.price.match(/\$?([\d.]+)/);
    const basePrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const discount = basePrice * 0.1; // 10% discount
    const protectFee = 0.19;
    const total = basePrice - discount + protectFee;

    // Add product display
    const productHTML = `
        <div class="buy-details">
            <div class="left-section">
                <img src="${product.image}" alt="${product.name}" class="buy-img">                       
            </div>
            <div class="right-section">
                <div class="product-name">${product.name}</div>
                <div class="product-price">Price: $${basePrice.toFixed(2)}</div>
            </div>
        </div>`;
    document.getElementById('buy-container').insertAdjacentHTML('afterbegin', productHTML);

    // Update Price Section
    const priceSectionHTML = `
        <div class="price-para">
            <p>PRICE DETAILS</p>
        </div>
        <hr>
        <div class="price-calc">
            <div class="price-details">
                <div class="price-dsc">
                    <p>Price :</p>
                    <p>Discount (10%) :</p>
                    <p>Protect Promise Fee :</p>
                </div>
                <div class="price-num">
                    <p>$${basePrice.toFixed(2)}</p>
                    <p>-$${discount.toFixed(2)}</p>
                    <p>$${protectFee.toFixed(2)}</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="total-amount-section">
            <div class="total-amount">
                <p>Total Amount</p>
            </div>
            <div class="total-amount-price">
                <p>$${total.toFixed(2)}</p>
            </div>
        </div>`;

    document.getElementById('price-container').innerHTML = priceSectionHTML;

    //clear product after placing order
    const btn = document.querySelector('.buy-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            alert("Order Placed Successfully!");
            localStorage.removeItem('selectedProduct');
        });
    }
});

// Accessing back to product button
const productViewLink = document.querySelector('#product-view');
if (productViewLink) {
  productViewLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html#product-section';
  });
}