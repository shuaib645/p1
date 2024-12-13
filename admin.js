let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const imageInput = document.getElementById("product-image").files[0];

    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function () {
            const newProduct = {
                name: name,
                price: parseFloat(price),
                image: reader.result,
            };
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));
            displayAdminProducts();
        };
        reader.readAsDataURL(imageInput);
    }
}

function displayAdminProducts() {
    const adminProductList = document.getElementById("product-list-admin");
    adminProductList.innerHTML = "";

    products.forEach((product, index) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="${product.name}" width="100">
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        adminProductList.appendChild(productItem);
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayAdminProducts();
}

document.getElementById("add-product-form").addEventListener("submit", addProduct);
displayAdminProducts();
