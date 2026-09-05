// Clave única para localStorage
const CLAVE_CARRITO = 'mi_carrito';

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarVistaCarrito();
  if (document.getElementById('tabla-carrito-contenedor')) {
    renderizarPaginaCarrito();
  }
}

function agregarAlCarrito(nombre, precio, imagen = '') {
  let carrito = obtenerCarrito();
  const indice = carrito.findIndex(item => item.nombre === nombre);

  if (indice !== -1) {
    carrito[indice].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }

  guardarCarrito(carrito);
  alert(`"${nombre}" se agregó al carrito.`);
}

function eliminarDelCarrito(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
}

function cambiarCantidad(index, cambio) {
  let carrito = obtenerCarrito();
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarCarrito(carrito);
}

function vaciarCarrito() {
  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    localStorage.removeItem(CLAVE_CARRITO);
    actualizarVistaCarrito();
    if (document.getElementById('tabla-carrito-contenedor')) {
      renderizarPaginaCarrito();
    }
  }
}

function finalizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
  localStorage.removeItem(CLAVE_CARRITO);
  window.location.href = "index.html";
}

// Actualizar contador y contenido del desplegable flotante
function actualizarVistaCarrito() {
  const carrito = obtenerCarrito();
  const contadorBadge = document.getElementById('cart-counter');
  const contenedorBody = document.getElementById('cart-body-content');
  const totalPrecio = document.getElementById('cart-total-price');

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  if (contadorBadge) contadorBadge.textContent = totalItems;

  if (contenedorBody) {
    contenedorBody.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
      contenedorBody.innerHTML = '<p class="text-center text-white-50 my-3" style="font-size:0.9rem;">El carrito está vacío</p>';
    } else {
      carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        contenedorBody.innerHTML += `
          <div class="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-2">
            <div>
              <h6 class="my-0 text-white fw-bold" style="font-size:13px;">${item.nombre}</h6>
              <small class="text-white-50" style="font-size:11px;">$${item.precio.toLocaleString('cl-CL')} x ${item.cantidad}</small>
            </div>
            <div class="d-flex align-items-center">
              <span class="text-info fw-bold me-2" style="font-size:13px;">$${subtotal.toLocaleString('cl-CL')}</span>
              <button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="eliminarDelCarrito(${index})">&times;</button>
            </div>
          </div>
        `;
      });
    }

    if (totalPrecio) totalPrecio.textContent = `$${total.toLocaleString('cl-CL')}`;
  }
}

// Renderizar la vista principal en carrito.html
function renderizarPaginaCarrito() {
  const contenedor = document.getElementById('tabla-carrito-contenedor');
  const resumenSubtotal = document.getElementById('resumen-subtotal');
  const resumenTotal = document.getElementById('resumen-total');

  if (!contenedor) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-shopping-cart fa-3x mb-3 text-secondary"></i>
        <h3>Tu carrito está vacío</h3>
        <p class="text-white-50">Parece que aún no has añadido productos.</p>
        <a href="Productos.html" class="btn btn-primary mt-2">Explorar Productos</a>
      </div>
    `;
    if (resumenSubtotal) resumenSubtotal.textContent = '$0';
    if (resumenTotal) resumenTotal.textContent = '$0';
    return;
  }

  let html = `
    <table class="table table-dark table-hover align-middle mb-0">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th class="text-center">Cantidad</th>
          <th class="text-end">Subtotal</th>
          <th class="text-center">Acción</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
      <tr>
        <td>
          <div class="d-flex align-items-center">
            ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}" class="rounded me-3" style="width:45px; height:45px; object-fit:cover;">` : ''}
            <span class="fw-bold">${item.nombre}</span>
          </div>
        </td>
        <td>$${item.precio.toLocaleString('cl-CL')}</td>
        <td class="text-center">
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-light" onclick="cambiarCantidad(${index}, -1)">-</button>
            <span class="btn btn-dark disabled text-white px-3 fw-bold">${item.cantidad}</span>
            <button class="btn btn-outline-light" onclick="cambiarCantidad(${index}, 1)">+</button>
          </div>
        </td>
        <td class="text-end fw-bold">$${subtotal.toLocaleString('cl-CL')}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  contenedor.innerHTML = html;

  if (resumenSubtotal) resumenSubtotal.textContent = `$${total.toLocaleString('cl-CL')}`;
  if (resumenTotal) resumenTotal.textContent = `$${total.toLocaleString('cl-CL')}`;
}

// Asignación de evento para abrir/cerrar desplegable
document.addEventListener('DOMContentLoaded', () => {
  actualizarVistaCarrito();
  if (document.getElementById('tabla-carrito-contenedor')) {
    renderizarPaginaCarrito();
  }

  const toggleBtn = document.getElementById('cart-toggle-btn') || document.querySelector('.cart-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const cartPopup = document.getElementById('cart-popup');

  if (toggleBtn && cartPopup) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cartPopup.classList.toggle('hidden');
    });
  }

  if (closeBtn && cartPopup) {
    closeBtn.addEventListener('click', () => {
      cartPopup.classList.add('hidden');
    });
  }
});
