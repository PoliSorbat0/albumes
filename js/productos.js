const productosIniciales = [
  { id: 1, nombre: "Ænima", artista: "TOOL - Edición Vinilo 180g.", precio: 34990, imagen: "imagenes/Tool-AEnima.jpg" },
  { id: 2, nombre: "Jar of Flies", artista: "Alice in Chains - Vinilo 180g.", precio: 28990, imagen: "imagenes/AliceInChains-JarOfFlies.jpg" },
  { id: 3, nombre: "Dirt", artista: "Alice in Chains - Vinilo 180g.", precio: 31990, imagen: "imagenes/AliceInChains-Dirt.jpg" },
  { id: 4, nombre: "White Pony", artista: "Deftones - Edición Vinilo", precio: 32990, imagen: "imagenes/Deftones-WhitePony.jpg" },
  { id: 5, nombre: "Meteora", artista: "Linkin Park - Edición Vinilo", precio: 29990, imagen: "imagenes/LinkinPark-Meteora.jpg" },
  { id: 6, nombre: "Significant Other", artista: "Limp Bizkit - Vinilo", precio: 27990, imagen: "imagenes/LimpBizkit-SignificantOther.jpg" }
];

function cargarProductosIniciales() {
  if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productosIniciales));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const inputBusqueda = document.getElementById('input-busqueda');
  // Seleccionamos las columnas contenedoras de cada producto
  const columnasProductos = document.querySelectorAll('.columna-producto');

  if (inputBusqueda) {
    inputBusqueda.addEventListener('input', (e) => {
      const texto = e.target.value.toLowerCase().trim();

      columnasProductos.forEach(col => {
        const titulo = col.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const artista = col.querySelector('.card-text')?.textContent.toLowerCase() || '';

        // Si coincide la búsqueda, mostramos la columna; si no, la ocultamos usando d-none
        if (titulo.includes(texto) || artista.includes(texto)) {
          col.classList.remove('d-none');
        } else {
          col.classList.add('d-none');
        }
      });
    });
  }
});

cargarProductosIniciales();