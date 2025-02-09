let cart = [];

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Agregar eventos a los botones "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');

        const existingItem = cart.find(cartItem => cartItem.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        updateCartDisplay();
    });
});

// Mostrar/ocultar el carrito al hacer hover
document.getElementById('cart-icon').addEventListener('mouseover', () => {
    document.getElementById('cart-dropdown').style.display = 'block';
});

document.getElementById('cart-icon').addEventListener('mouseout', () => {
    document.getElementById('cart-dropdown').style.display = 'none';
});

// Vaciar el carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCartDisplay();
});

// Finalizar compra (simulación)
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
    } else {
        alert('Compra finalizada. Gracias por su compra.');
        cart = [];
        updateCartDisplay();
    }
});

document.getElementById('add-article-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('article-name').value;
    const price = parseFloat(document.getElementById('article-price').value);
    const image = document.getElementById('article-image').value;
    const attribute1 = document.getElementById('article-attribute1').value;
    const attribute2 = document.getElementById('article-attribute2').value;
    const attribute3 = document.getElementById('article-attribute3').value;

    // Validar que el precio sea mayor o igual a 1000
    if (price < 1000) {
        alert('El precio debe ser mayor o igual a 1000.');
        return;
    }

    // Crear una nueva tarjeta para el artículo
    const newArticle = document.createElement('div');
    newArticle.classList.add('div13');
    newArticle.innerHTML = `
        <img src="${image}" alt="${name}" />
        <h3>${name}</h3>
        <p>${attribute1}, ${attribute2}, ${attribute3}</p>
        <p>Precio: $${price.toFixed(2)}</p>
        <button class="add-to-cart" data-name="${name}" data-price="${price}" data-image="${image}">Añadir al carrito</button>
    `;

    // Agregar la nueva tarjeta a la sección de la tienda
    document.getElementById('store-container').appendChild(newArticle);

    // Vaciar el formulario
    document.getElementById('add-article-form').reset();

    // Agregar el evento al nuevo botón "Añadir al carrito"
    newArticle.querySelector('.add-to-cart').addEventListener('click', () => {
        const item = { name, price, image, quantity: 1 };

        const existingItem = cart.find(cartItem => cartItem.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }

        updateCartDisplay();
    });
});