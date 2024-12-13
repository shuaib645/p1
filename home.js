let products = JSON.parse(localStorage.getItem("products")) || [];
const searchBar = document.getElementById("search-bar");

function displayProducts(filter = "") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    // Filter products by search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase())
    );

    filteredProducts.forEach((product, index) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" width="100">
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

function addToCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products[index];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart-count").innerText = cart.length;
}

// Add event listener for search functionality
searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    displayProducts(searchTerm);
});

// Initial display of products
displayProducts();
