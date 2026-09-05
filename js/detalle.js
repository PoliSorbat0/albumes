// Base de datos local de productos para la página de detalle
const productos = {
  "aenima": {
    nombre: "Ænima",
    artista: "TOOL",
    precio: 34990,
    anio: "1996",
    imagen: "imagenes/Tool-AEnima.jpg",
    descripcion: "Segundo álbum de estudio de la banda estadounidense de metal progresivo TOOL. Un clásico indiscutible en formato vinilo de 180g con una calidad de sonido acústica de alta fidelidad."
  },
  "jar-of-flies": {
    nombre: "Jar of Flies",
    artista: "Alice in Chains",
    precio: 28990,
    anio: "1994",
    imagen: "imagenes/AliceInChains-JarOfflies.jpg",
    descripcion: "EP icónico de Alice in Chains. Fue el primer EP en la historia de la música en alcanzar el número uno en la lista Billboard 200."
  },
  "dirt": {
    nombre: "Dirt",
    artista: "Alice in Chains",
    precio: 31990,
    anio: "1992",
    imagen: "imagenes/AliceInChains-Dirt.jpg",
    descripcion: "La obra maestra del grunge y metal alternativo. Obra fundamental de la banda liderada por Layne Staley."
  },
  "white-pony": {
    nombre: "White Pony",
    artista: "Deftones",
    precio: 32990,
    anio: "2000",
    imagen: "imagenes/Deftones-WhitePony.jpg",
    descripcion: "El álbum definitivo del nu-metal y rock alternativo de la década del 2000, incluyendo himnos como Change y Digital Bath."
  },
  "meteora": {
    nombre: "Meteora",
    artista: "Linkin Park",
    precio: 29990,
    anio: "2003",
    imagen: "imagenes/LinkinPark-Meteora.jpg",
    descripcion: "El segundo álbum de estudio de Linkin Park. Contiene éxitos legendarios como Numb, Somewhere I Belong y Faint."
  },
  "chocolate-starfish": {
    nombre: "Chocolate Starfish and the Hot Dog Flavored Water",
    artista: "Limp Bizkit",
    precio: 27990,
    anio: "2000",
    imagen: "imagenes/LimpBizkit-ChocolateStarFishAndTheHotDogFlavoredWater.jpg",
    descripcion: "El álbum cumbre del nu-metal comercial de principios de los 2000, con temas como Rollin' y My Generation."
  },
  "gold-cobra": {
    nombre: "Gold Cobra",
    artista: "Limp Bizkit",
    precio: 26990,
    anio: "2011",
    imagen: "imagenes/Limpbizkit-GoldenCobra.jpg",
    descripcion: "El regreso triunfal de la formación original de Limp Bizkit con Riffs potentes y la energía clásica de la banda."
  },
  "infest": {
    nombre: "Infest",
    artista: "Papa Roach",
    precio: 25990,
    anio: "2000",
    imagen: "imagenes/PapaRoach-Infest.jpg",
    descripcion: "Álbum debut en un sello major de Papa Roach, incluyendo el histórico single Last Resort."
  },
  "deadwing": {
    nombre: "Deadwing",
    artista: "Porcupine Tree",
    precio: 30990,
    anio: "2005",
    imagen: "imagenes/PorcupineTree-Deadwing.jpg",
    descripcion: "Obra maestra del rock progresivo contemporáneo producido por Steven Wilson."
  },
  "in-absentia": {
    nombre: "In Absentia",
    artista: "Porcupine Tree",
    precio: 31990,
    anio: "2002",
    imagen: "imagenes/PorcupineTree-InAbsentia.jpg",
    descripcion: "Álbum fundamental de Porcupine Tree que marcó su transición hacia sonidos más pesados y progresivos."
  },
  "reise-reise": {
    nombre: "Reise, Reise",
    artista: "Rammstein",
    precio: 33990,
    anio: "2004",
    imagen: "imagenes/Rammstein-ReiseReise.jpg",
    descripcion: "Cuarto álbum de la banda alemana de Neue Deutsche Härte. Incluye éxitos globales como Amerika y Mein Teil."
  },
  "californication": {
    nombre: "Californication",
    artista: "Red Hot Chili Peppers",
    precio: 29990,
    anio: "1999",
    imagen: "imagenes/RedHotChiliPeppers-Californication.jpg",
    descripcion: "Álbum multiplatino de RHCP marcado por el regreso del guitarrista John Frusciante."
  },
  "purple": {
    nombre: "Purple",
    artista: "Stone Temple Pilots",
    precio: 28990,
    anio: "1994",
    imagen: "imagenes/StoneTemplePilot-Purple.jpg",
    descripcion: "El aclamado segundo álbum de STP con éxitos como Vasoline, Interstate Love Song y Big Empty."
  },
  "disintegration": {
    nombre: "Disintegration",
    artista: "The Cure",
    precio: 32990,
    anio: "1989",
    imagen: "imagenes/TheCure-Desintegration.jpg",
    descripcion: "La obra cumbre del rock gótico y post-punk de The Cure. Incluye Lovesong, Pictures of You y Lullaby."
  },
  "wish": {
    nombre: "Wish",
    artista: "The Cure",
    precio: 30990,
    anio: "1992",
    imagen: "imagenes/TheCure-Wish.jpg",
    descripcion: "Noveno álbum de estudio de la banda británica, encabezado por el popular éxito Friday I'm in Love."
  },
  "life-is-killing-me": {
    nombre: "Life Is Killing Me",
    artista: "Type O Negative",
    precio: 33990,
    anio: "2003",
    imagen: "imagenes/TypeOfNegative-LikelsKillingMe.jpg",
    descripcion: "Sexto álbum de estudio del grupo de metal gótico liderado por Peter Steele, cargado de humor negro y riffs pesados."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Obtener el parámetro 'id' de la URL
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get('id');

  const producto = productos[idProducto];

  if (producto) {
    // Inyectar datos en el HTML
    document.getElementById('producto-titulo').textContent = producto.nombre;
    document.getElementById('producto-artista').textContent = producto.artista;
    document.getElementById('producto-precio').textContent = `$${producto.precio.toLocaleString('cl-CL')}`;
    document.getElementById('producto-anio').textContent = producto.anio;
    document.getElementById('producto-descripcion').textContent = producto.descripcion;
    
    const imgElement = document.getElementById('producto-imagen');
    imgElement.src = producto.imagen;
    imgElement.alt = `${producto.nombre} - ${producto.artista}`;

    // Configurar el botón de agregar al carrito
    const btnCart = document.getElementById('btn-add-cart');
    if (btnCart) {
      btnCart.onclick = () => {
        const nombreCompleto = `${producto.nombre} - ${producto.artista}`;
        agregarAlCarrito(nombreCompleto, producto.precio, producto.imagen);
      };
    }

    // Configurar el botón de lista de deseos (opcional)
    const btnWish = document.getElementById('btn-add-wishlist');
    if (btnWish) {
      btnWish.onclick = () => {
        alert(`"${producto.nombre}" se ha añadido a tu lista de deseos.`);
      };
    }
  } else {
    // Si no encuentra el ID o no hay parámetro en la URL
    document.getElementById('producto-titulo').textContent = "Producto no encontrado";
    document.getElementById('producto-descripcion').textContent = "Lo sentimos, el producto solicitado no existe en nuestro catálogo.";
    const imgElement = document.getElementById('producto-imagen');
    if (imgElement) imgElement.style.display = 'none';
  }
});