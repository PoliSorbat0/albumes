// Arreglo de objetos con el inventario inicial de productos de la tienda
const productosIniciales = [
  { id: 1, nombre: "Ænima", artista: "TOOL - Edición Vinilo 180g.", precio: 34990, imagen: "imagenes/Tool-AEnima.jpg" },
  { id: 2, nombre: "Jar of Flies", artista: "Alice in Chains - Vinilo 180g.", precio: 28990, imagen: "imagenes/AliceInChains-JarOfFlies.jpg" },
  { id: 3, nombre: "Dirt", artista: "Alice in Chains - Vinilo 180g.", precio: 31990, imagen: "imagenes/AliceInChains-Dirt.jpg" },
  { id: 4, nombre: "White Pony", artista: "Deftones - Edición Vinilo", precio: 32990, imagen: "imagenes/Deftones-WhitePony.jpg" },
  { id: 5, nombre: "Meteora", artista: "Linkin Park - Edición Vinilo", precio: 29990, imagen: "imagenes/LinkinPark-Meteora.jpg" },
  { id: 6, nombre: "Significant Other", artista: "Limp Bizkit - Vinilo", precio: 27990, imagen: "imagenes/LimpBizkit-SignificantOther.jpg" }
];

/**
 * Inicializa la clave 'productos' en LocalStorage con el catálogo por defecto
 * únicamente si aún no existe en el almacenamiento local.
 */
function cargarProductosIniciales() {
  if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productosIniciales));
  }
}

// Configuración de los eventos cuando el árbol del DOM haya sido cargado por completo
document.addEventListener('DOMContentLoaded', () => {
  const inputBusqueda = document.getElementById('input-busqueda');
  // Selección de todas las columnas contenedoras de las tarjetas de producto
  const columnasProductos = document.querySelectorAll('.columna-producto');

  if (inputBusqueda) {
    // Escucha de entradas en tiempo real dentro del campo de búsqueda
    inputBusqueda.addEventListener('input', (e) => {
      const texto = e.target.value.toLowerCase().trim();

      columnasProductos.forEach(col => {
        // Extracción del texto del título y del artista/descripción dentro de la tarjeta
        const titulo = col.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const artista = col.querySelector('.card-text')?.textContent.toLowerCase() || '';

        // Filtrado dinámico: alterna la clase 'd-none' de Bootstrap para mostrar u ocultar la columna
        if (titulo.includes(texto) || artista.includes(texto)) {
          col.classList.remove('d-none');
        } else {
          col.classList.add('d-none');
        }
      });
    });
  }
});

// Llamada inmediata para asegurar la persistencia inicial en LocalStorage
cargarProductosIniciales();