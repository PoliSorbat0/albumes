/* ==========================================
   1. ESTILOS DE LA BARRA SUPERIOR (MARQUEE)
   ========================================== */
.pm-marquee-wrap {
    background-color: #2b2055 !important;
    color: #ffffff !important;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    padding: 10px 0;
    font-size: 0.85rem;
    font-weight: 600;
    border: none;
}

.pm-marquee-wrap *,
.pm-marquee-wrap i,
.pm-item {
    color: #ffffff !important;
}

.pm-marquee {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
}

.pm-marquee-track {
    display: flex;
    gap: 3rem;
    animation: marquee 18s linear infinite;
    will-change: transform;
}

.pm-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.pm-ico {
    font-size: 1rem;
}

@keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
}

/* ==========================================
   2. FONDO GENERAL Y DE PÁGINAS ESPECÍFICAS
   ========================================== */
body {
    background-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
        url('../imagenes/FondoTienda.png');
    background-repeat: repeat;
    background-position: center top;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
    color: #ffffff;
}

body.body-lore {
    background-image:
        linear-gradient(to bottom, rgba(56, 0, 121, 0.7), rgba(65, 8, 119, 0.7)),
        url('../imagenes/us.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    background-attachment: fixed;
    min-height: 100vh;
}

/* ==========================================
   3. BARRA DE NAVEGACIÓN (NAVBAR)
   ========================================== */
.navbar-custom {
    background-color: #1a1235 !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-custom .navbar-brand,
.navbar-custom .nav-link {
    color: #ffffff !important;
    font-weight: 500;
}

.navbar-custom .nav-link:hover,
.navbar-custom .nav-link.active {
    color: #ff8c00 !important;
}

.navbar-custom .navbar-toggler-icon {
    filter: invert(1);
}

.navbar-custom .dropdown-menu {
    background-color: #2b2055;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.navbar-custom .dropdown-item {
    color: #ffffff;
}

.navbar-custom .dropdown-item:hover {
    background-color: #3b2d6b;
    color: #ff8c00;
}

/* ==========================================
   4. TIPOGRAFÍA Y BOTONES
   ========================================== */
.titulo-principal {
    color: #ffffff !important;
    font-weight: 800;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.subtitulo-principal {
    color: #e0e0e0 !important;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);
}

.auth-buttons {
    display: flex;
    gap: 12px;
    align-items: center;
}

.btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    font-family: system-ui, -apple-system, sans-serif;
    transition: background-color 0.2s ease, border-color 0.2s ease;
    display: inline-block;
    text-align: center;
}

.btn-primary {
    background-color: #331853 !important;
    border-color: #331853 !important;
    color: #ffffff !important;
}

.btn-primary:hover {
    background-color: #580770 !important;
    border-color: #580770 !important;
}

.btn-secondary {
    background-color: #e4e6eb !important;
    border-color: #e4e6eb !important;
    color: #050505 !important;
}

.btn-secondary:hover {
    background-color: #d8dadf !important;
    border-color: #d8dadf !important;
}

/* ==========================================
   5. CARRITO DE COMPRAS FLOTANTE (DARK/PURPLE)
   ========================================== */
.floating-cart-container {
    position: fixed;
    bottom: 25px;
    right: 25px;
    z-index: 1050;
    font-family: sans-serif;
}

.cart-btn {
    background-color: #3b1e54;
    color: #ffffff;
    border: 1px solid #5c2c84;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: transform 0.2s ease, background-color 0.2s ease;
}

.cart-btn:hover {
    background-color: #5c2c84;
    transform: scale(1.1);
}

.cart-btn .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    background-color: #dc3545;
    color: #ffffff;
    font-size: 11px;
    border-radius: 50%;
    padding: 4px 7px;
}

/* Ventana emergente del Carrito */
.cart-popup {
    position: absolute;
    bottom: 75px;
    right: 0px;
    width: 320px;
    background-color: #1f1a24 !important; /* Fondo morado/negro oscuro */
    border: 1px solid #3b1e54;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: #ffffff !important;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.cart-popup.hidden {
    display: none !important;
    opacity: 0;
    transform: scale(0.9);
    pointer-events: none;
}

.cart-header {
    background-color: #2a183d;
    color: #ffffff;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #3b1e54;
}

.cart-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff !important;
}

.close-btn {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
}

.cart-body {
    padding: 15px;
    max-height: 250px;
    overflow-y: auto;
    background-color: #1f1a24 !important; /* Fondo morado oscuro */
    color: #ffffff !important;
}

.cart-footer {
    padding: 15px;
    background-color: #18141d;
    border-top: 1px solid #3b1e54;
}

.cart-total {
    display: flex;
    justify-content: space-between;
    color: #ffffff !important;
    margin-bottom: 12px;
    font-size: 15px;
}

.checkout-btn {
    display: block;
    width: 100%;
    background-color: #5c2c84;
    color: #ffffff !important;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
    border: none;
    transition: background-color 0.2s ease;
}

.checkout-btn:hover {
    background-color: #7237a3;
    color: #ffffff !important;
}

/* ==========================================
   6. TARJETA CONTENEDORA PARA DETALLE PRODUCTO
   ========================================== */
.card-detalle-producto {
    background-color: rgba(26, 16, 43, 0.88);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
}
