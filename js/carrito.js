// Clave única para la gestión de datos en LocalStorage
const CLAVE_CARRITO = 'mi_carrito';

/**
 * Obtiene la lista de productos almacenados en LocalStorage.
 * @returns {Array} Arreglo con los elementos del carrito.
 */
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
}

/**
 * Guarda el estado del carrito en LocalStorage y refresca las vistas UI.
 * @param {Array} carrito - Arreglo actualizado de elementos.
 */
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarVistaCarrito();
  if (document.getElementById('tabla-carrito-contenedor')) {
    renderizarPaginaCarrito();
  }
}

/**
 * Añade un producto al carrito o incrementa su cantidad si ya existe.
 * @param {string} nombre - Nombre descriptivo del producto.
 * @param {number} precio - Precio unitario del producto.
 * @param {string} imagen - Ruta relativa de la imagen.
 */
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

/**
 * Elimina un producto del carrito según su índice.
 * @param {number} index - Posición del elemento en el arreglo.
 */
function eliminarDelCarrito(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
}

/**
 * Incrementa o decrementa la cantidad de un ítem en el carrito.
 * @param {number} index - Posición del producto.
 * @param {number} cambio - Valor de cambio (+1 o -1).
 */
function cambiarCantidad(index, cambio) {
  let carrito = obtenerCarrito();
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarCarrito(carrito);
}

/**
 * Limpia totalmente la clave de almacenamiento del carrito previa confirmación.
 */
function vaciarCarrito() {
  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    localStorage.removeItem(CLAVE_CARRITO);
    actualizarVistaCarrito();
    if (document.getElementById('tabla-carrito-contenedor')) {
      renderizarPaginaCarrito();
    }
  }
}

/**
 * Simula el proceso de pago y redirecciona a la página de inicio.
 */
function finalizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const usuarioActual = JSON.parse(localStorage.getItem('viniLoveSesion') || 'null');
  const total = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
  const compra = {
    fecha: new Date().toLocaleString('es-CL'),
    cliente: usuarioActual ? usuarioActual.correo : 'Invitado',
    productos: carrito,
    total
  };

  const historialCompras = JSON.parse(localStorage.getItem('viniLoveCompras') || '[]');
  historialCompras.unshift(compra);
  localStorage.setItem('viniLoveCompras', JSON.stringify(historialCompras.slice(0, 20)));

  alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
  localStorage.removeItem(CLAVE_CARRITO);
  window.location.href = "index.html";
}

/**
 * Actualiza dinámicamente el badge contador y el menú desplegable flotante.
 */
function actualizarVistaCarrito() {
  const carrito = obtenerCarrito();
  const contadorBadge = document.getElementById('cart-counter');
  const contenedorBody = document.getElementById('cart-body-content');
  const totalPrecio = document.getElementById('cart-total-price');

  // Suma total de unidades acumuladas
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

/**
 * Renderiza la tabla completa y el resumen de precios en carrito.html
 */
function renderizarPaginaCarrito() {
  const contenedor = document.getElementById('tabla-carrito-contenedor');
  const resumenSubtotal = document.getElementById('resumen-subtotal');
  const resumenTotal = document.getElementById('resumen-total');

  if (!contenedor) return;

  const carrito = obtenerCarrito();

  // Estado cuando el carrito no posee ítems
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

  // Estructura tabular de productos agregados
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

// Inicialización de escuchadores y carga inicial de interfaz
document.addEventListener('DOMContentLoaded', () => {
  actualizarVistaCarrito();
  if (document.getElementById('tabla-carrito-contenedor')) {
    renderizarPaginaCarrito();
  }

  // Controladores de apertura y cierre para el carrito flotante desplegable
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