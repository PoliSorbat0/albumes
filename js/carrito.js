document.addEventListener('DOMContentLoaded', () => {
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartPopup = document.getElementById('cart-popup');
  const container = document.getElementById('cart-container');

  // Abrir/cerrar al hacer clic en el botón flotante
  cartToggleBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic llegue al document
    cartPopup.classList.toggle('hidden');
  });

  // Cerrar al hacer clic en la "X"
  cartCloseBtn.addEventListener('click', () => {
    cartPopup.classList.add('hidden');
  });

  // Cerrar si haces clic fuera del carrito
  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) {
      cartPopup.classList.add('hidden');
    }
  });
});