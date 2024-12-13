function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTotal = document.getElementById("cart-total");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("product-item");
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
        `;
        total += item.price;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.innerText = `Total: $${total}`;
}

function sendToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let message = "Order Details:\n";
    cart.forEach((item) => {
        message += `${item.name} - $${item.price}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `Total: $${total}`;

    const phone = "8447221799";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url);
}

document.getElementById("send-whatsapp").addEventListener("click", sendToWhatsApp);
displayCart();
