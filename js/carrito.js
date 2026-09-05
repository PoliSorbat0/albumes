// Manejo interactivo del Carrito de Compras usando LocalStorage
document.addEventListener('DOMContentLoaded', () => {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartPopup = document.getElementById('cart-popup');
    const container = document.getElementById('cart-container');

    // Despliegue de ventana del carrito flotante
    if (cartToggleBtn && cartPopup) {
        cartToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            cartPopup.classList.toggle('hidden');
        });
    }

    if (cartCloseBtn && cartPopup) {
        cartCloseBtn.addEventListener('click', () => {
            cartPopup.classList.add('hidden');
        });
    }

    // Ocultar carrito al hacer clic fuera del elemento
    document.addEventListener('click', (event) => {
        if (container && !container.contains(event.target)) {
            cartPopup.classList.add('hidden');
        }
    });

    // Cargar los productos guardados al iniciar la página
    actualizarVistaCarrito();
});

// Función para obtener productos desde localStorage de manera segura
function obtenerCarrito() {
    const datos = localStorage.getItem('mi_carrito');
    return datos ? JSON.parse(datos) : [];
}

// Función global para añadir items al carrito sin necesidad de backend
function agregarAlCarrito(nombre, precio) {
    const carrito = obtenerCarrito();
    carrito.push({ nombre, precio });
    localStorage.setItem('mi_carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
}

// Renderizar dinámicamente los items dentro del carrito flotante
function actualizarVistaCarrito() {
    const carrito = obtenerCarrito();
    const cartCounter = document.getElementById('cart-counter');
    const cartBodyContent = document.getElementById('cart-body-content');
    const cartTotalPrice = document.getElementById('cart-total-price');

    if (cartCounter) cartCounter.textContent = carrito.length;

    if (cartBodyContent) {
        if (carrito.length === 0) {
            cartBodyContent.innerHTML = '<p class="text-muted text-center my-2">Tu carrito está vacío</p>';
        } else {
            let html = '';
            let total = 0;
            carrito.forEach((item, index) => {
                total += item.precio;
                html += `
                    <div class="cart-item">
                        <span>${item.nombre}</span>
                        <strong>$${item.precio.toLocaleString('es-CL')}</strong>
                    </div>
                `;
            });
            cartBodyContent.innerHTML = html;
            if (cartTotalPrice) cartTotalPrice.textContent = `$${total.toLocaleString('es-CL')}`;
        }
    }
}
