// Definición de dominios de correo institucional y personal autorizados
const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'vinilove.com'];
const CLAVE_USUARIOS = 'viniLoveUsuarios';
const CLAVE_SESION = 'viniLoveSesion';
const CLAVE_AVATAR = 'viniLoveAvatar';
const CLAVE_HISTORIAL_COMPRAS = 'viniLoveCompras';
const CLAVE_BLOG_POSTS = 'viniLoveBlogPosts';
const CLAVE_PRODUCTOS = 'productos';
const ADMIN_EMAIL = 'viniowner@vinilove.com';
const ADMIN_PASSWORD = 'Viniadmin123';

function normalizarUsuario(usuario) {
  if (!usuario || typeof usuario !== 'object') {
    return usuario;
  }

  const correo = String(usuario.correo || '').toLowerCase();
  const esAdmin = usuario.rol === 'admin' || correo === ADMIN_EMAIL.toLowerCase();

  return {
    ...usuario,
    rol: esAdmin ? 'admin' : 'cliente',
    correo: String(usuario.correo || '').trim().toLowerCase()
  };
}

function asegurarCuentaAdmin() {
  if (typeof localStorage === 'undefined') {
    return;
  }

  const usuarios = obtenerUsuarios();
  const usuarioAdminBase = {
    run: '00000000',
    nombre: 'Vinilover',
    apellidos: 'Owner',
    correo: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    rol: 'admin'
  };
  const indiceAdmin = usuarios.findIndex((usuario) => String(usuario.correo || '').toLowerCase() === ADMIN_EMAIL.toLowerCase());

  if (indiceAdmin === -1) {
    usuarios.push(usuarioAdminBase);
    guardarUsuarios(usuarios);
    return;
  }

  usuarios[indiceAdmin] = {
    ...usuarioAdminBase,
    ...usuarios[indiceAdmin],
    run: '00000000',
    nombre: 'Vinilover',
    apellidos: 'Owner',
    correo: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    rol: 'admin'
  };

  guardarUsuarios(usuarios);
}

function esUsuarioAdmin(usuario) {
  if (!usuario) return false;
  return usuario.rol === 'admin' || String(usuario.correo || '').toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/**
 * Valida que el formato del correo contenga un único '@' 
 * y que el dominio pertenezca a la lista de dominios permitidos.
 */
function validarCorreo(correo) {
  if (!correo) return false;
  const partes = correo.split('@');
  if (partes.length !== 2) return false;
  return DOMINIOS_PERMITIDOS.includes(partes[1].toLowerCase());
}

/**
 * Valida la estructura básica del RUN/RUT chileno (sin puntos ni guion).
 * Acepta entre 7 y 8 dígitos seguidos de un dígito verificador (número o letra K/k).
 */
function validarRUN(run) {
  const regexRUN = /^[0-9]{7,8}[0-9kK]{1}$/;
  return regexRUN.test(run);
}

function obtenerUsuarios() {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  try {
    const datos = localStorage.getItem(CLAVE_USUARIOS);
    const usuarios = datos ? JSON.parse(datos) : [];
    return Array.isArray(usuarios) ? usuarios.map((usuario) => normalizarUsuario(usuario)) : [];
  } catch (error) {
    console.error('No se pudieron leer los usuarios guardados:', error);
    return [];
  }
}

function guardarUsuarios(usuarios) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(Array.isArray(usuarios) ? usuarios.map((usuario) => normalizarUsuario(usuario)) : []));
  }
}

function obtenerUsuarioActual() {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const sesion = localStorage.getItem(CLAVE_SESION);
    const usuario = sesion ? JSON.parse(sesion) : null;
    if (!usuario) return null;
    return normalizarUsuario(usuario);
  } catch (error) {
    console.error('No se pudo leer la sesión:', error);
    return null;
  }
}

function guardarSesion(usuario) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(normalizarUsuario(usuario)));
  }
}

function obtenerAvatarUsuario() {
  if (typeof localStorage === 'undefined') return 'imagenes/LogoViniLove.png';

  try {
    const avatarGuardado = localStorage.getItem(CLAVE_AVATAR);
    return avatarGuardado || 'imagenes/LogoViniLove.png';
  } catch (error) {
    return 'imagenes/LogoViniLove.png';
  }
}

function cambiarAvatarUsuario(file) {
  if (!file || !file.type.startsWith('image/')) {
    return;
  }

  const lector = new FileReader();
  lector.onload = function (evento) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CLAVE_AVATAR, evento.target.result);
    }
    if (typeof document !== 'undefined') {
      actualizarEstadoAutenticacion();
      const perfilAvatar = document.getElementById('perfilAvatar');
      if (perfilAvatar) {
        perfilAvatar.src = evento.target.result;
      }
    }
  };
  lector.readAsDataURL(file);
}

function cerrarSesion() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(CLAVE_SESION);
  }
  if (typeof document !== 'undefined') {
    actualizarEstadoAutenticacion();
  }
  if (typeof window !== 'undefined' && window.location.pathname.endsWith('perfil.html')) {
    window.location.href = 'index.html';
  }
}

function registrarUsuario({ run, nombre, apellidos, correo, password }) {
  const runNormalizado = String(run || '').trim().toUpperCase();
  const nombreNormalizado = String(nombre || '').trim();
  const apellidosNormalizados = String(apellidos || '').trim();
  const correoNormalizado = String(correo || '').trim().toLowerCase();
  const passwordNormalizada = String(password || '').trim();
  const esAdminCredencial = correoNormalizado === ADMIN_EMAIL.toLowerCase() && passwordNormalizada === ADMIN_PASSWORD;

  if (!validarRUN(runNormalizado)) {
    return { exito: false, mensaje: 'El RUN debe ser sin puntos ni guion y tener un largo de 7 a 9 caracteres (ej: 19011022K).' };
  }

  if (!nombreNormalizado || nombreNormalizado.length > 50) {
    return { exito: false, mensaje: 'El nombre es obligatorio y no debe superar 50 caracteres.' };
  }

  if (!apellidosNormalizados || apellidosNormalizados.length > 50) {
    return { exito: false, mensaje: 'Los apellidos son obligatorios y no deben superar 50 caracteres.' };
  }

  if (!correoNormalizado || correoNormalizado.length > 100 || !validarCorreo(correoNormalizado)) {
    return { exito: false, mensaje: 'El correo debe pertenecer a los dominios permitidos.' };
  }

  if (!passwordNormalizada || passwordNormalizada.length < 4 || passwordNormalizada.length > 10) {
    return { exito: false, mensaje: 'La contraseña debe tener entre 4 y 10 caracteres.' };
  }

  const usuarios = obtenerUsuarios();
  const correoExistente = usuarios.some((usuario) => usuario.correo.toLowerCase() === correoNormalizado);

  if (correoExistente) {
    return { exito: false, mensaje: 'Este correo ya está registrado. Intenta con otro.' };
  }

  const esAdmin = correoNormalizado === ADMIN_EMAIL.toLowerCase() && passwordNormalizada === ADMIN_PASSWORD;
  const nuevoUsuario = {
    run: runNormalizado,
    nombre: nombreNormalizado,
    apellidos: apellidosNormalizados,
    correo: correoNormalizado,
    password: passwordNormalizada,
    rol: esAdmin ? 'admin' : 'cliente'
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  guardarSesion({
    run: nuevoUsuario.run,
    nombre: nuevoUsuario.nombre,
    apellidos: nuevoUsuario.apellidos,
    correo: nuevoUsuario.correo,
    rol: nuevoUsuario.rol
  });

  return { exito: true, mensaje: '¡Usuario registrado exitosamente!', usuario: nuevoUsuario };
}

function loginUsuario(correo, password) {
  const correoNormalizado = String(correo || '').trim().toLowerCase();
  const passwordNormalizada = String(password || '').trim();
  const esAdminCredencial = correoNormalizado === ADMIN_EMAIL.toLowerCase() && passwordNormalizada === ADMIN_PASSWORD;

  if (!correoNormalizado || correoNormalizado.length > 100 || (!esAdminCredencial && !validarCorreo(correoNormalizado))) {
    return { exito: false, mensaje: 'El correo debe ser válido y pertenecer a @duoc.cl, @profesor.duoc.cl, @gmail.com o @vinilove.com.' };
  }

  if (!esAdminCredencial && (!passwordNormalizada || passwordNormalizada.length < 4 || passwordNormalizada.length > 10)) {
    return { exito: false, mensaje: 'La contraseña debe tener entre 4 y 10 caracteres.' };
  }

  const usuarios = obtenerUsuarios();
  const indiceAdmin = usuarios.findIndex((item) => String(item.correo || '').toLowerCase() === ADMIN_EMAIL.toLowerCase());

  if (esAdminCredencial) {
    const usuarioAdmin = {
      run: '00000000',
      nombre: 'Vinilover',
      apellidos: 'Owner',
      correo: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      rol: 'admin'
    };

    if (indiceAdmin >= 0) {
      usuarios[indiceAdmin] = {
        ...usuarios[indiceAdmin],
        ...usuarioAdmin,
        correo: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        rol: 'admin'
      };
    } else {
      usuarios.push(usuarioAdmin);
    }

    guardarUsuarios(usuarios);
    guardarSesion({
      run: usuarioAdmin.run,
      nombre: usuarioAdmin.nombre,
      apellidos: usuarioAdmin.apellidos,
      correo: usuarioAdmin.correo,
      rol: 'admin'
    });

    return {
      exito: true,
      mensaje: '¡Inicio de sesión exitoso! Bienvenido, administrador.',
      usuario: {
        run: usuarioAdmin.run,
        nombre: usuarioAdmin.nombre,
        apellidos: usuarioAdmin.apellidos,
        correo: usuarioAdmin.correo,
        rol: 'admin'
      }
    };
  }

  const usuario = usuarios.find((item) => item.correo.toLowerCase() === correoNormalizado && item.password === passwordNormalizada);

  if (!usuario) {
    return { exito: false, mensaje: 'Correo o contraseña incorrectos.' };
  }

  guardarSesion({
    run: usuario.run,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    correo: usuario.correo,
    rol: usuario.rol || (usuario.correo.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'cliente')
  });

  return {
    exito: true,
    mensaje: '¡Inicio de sesión exitoso!',
    usuario: {
      run: usuario.run,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      rol: usuario.rol || (usuario.correo.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'cliente')
    }
  };
}

function obtenerUsuarioRegistradoPorCorreo(correo) {
  const correoNormalizado = String(correo || '').trim().toLowerCase();
  if (!correoNormalizado) {
    return null;
  }

  return obtenerUsuarios().find((usuario) => usuario.correo.toLowerCase() === correoNormalizado) || null;
}

function obtenerHistorialCompras() {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_HISTORIAL_COMPRAS) || '[]');
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error('No se pudo leer el historial de compras:', error);
    return [];
  }
}

function guardarHistorialCompras(compras) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CLAVE_HISTORIAL_COMPRAS, JSON.stringify(compras));
  }
}

function actualizarEstadoAutenticacion() {
  if (typeof document === 'undefined') {
    return;
  }

  const contenedores = document.querySelectorAll('.auth-buttons');
  const usuario = obtenerUsuarioActual();

  contenedores.forEach((contenedor) => {
    if (!contenedor) return;

    if (usuario) {
      const avatarUrl = obtenerAvatarUsuario();
      const esAdminActual = esUsuarioAdmin(usuario);
      const adminMenu = esAdminActual ? '<li><a class="dropdown-item" href="admin.html">Panel Admin</a></li>' : '';
      contenedor.innerHTML = `
        <div class="d-flex align-items-center gap-2 dropdown profile-user-dropdown">
          <label class="profile-avatar-wrapper profile-avatar-menu" title="Cambiar foto de perfil">
            <img src="${avatarUrl}" alt="Foto de perfil" class="profile-avatar" />
            <input type="file" accept="image/*" class="d-none" id="inputCambiarAvatar" />
          </label>
          <button class="btn btn-outline-light btn-sm dropdown-toggle profile-user-menu-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="navbar-text text-white mb-0">Hola, ${usuario.nombre}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="perfil.html">Ver perfil</a></li>
            ${adminMenu}
            <li><a class="dropdown-item" href="perfil.html#historial-compras">Historial de compras</a></li>
            <li><a class="dropdown-item" href="perfil.html#solicitudes-contacto">Solicitudes de contacto</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button type="button" class="dropdown-item text-danger" id="btnCerrarSesion">Cerrar sesión</button></li>
          </ul>
        </div>
      `;

      const btnCerrarSesion = document.getElementById('btnCerrarSesion');
      if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', cerrarSesion);
      }

      const inputCambiarAvatar = document.getElementById('inputCambiarAvatar');
      if (inputCambiarAvatar) {
        inputCambiarAvatar.addEventListener('change', (event) => {
          cambiarAvatarUsuario(event.target.files[0]);
        });
      }
    } else {
      contenedor.innerHTML = `
        <a href="registro.html" class="btn btn-primary">Regístrate</a>
        <a href="login.html" class="btn btn-secondary">Iniciar sesión</a>
      `;
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      asegurarCuentaAdmin();
      actualizarEstadoAutenticacion();
    });
  } else {
    asegurarCuentaAdmin();
    actualizarEstadoAutenticacion();
  }
}

// ==========================================
// Handler Formulario Login
// ==========================================
function procesarLogin(e) {
  e.preventDefault();

  const correo = document.getElementById('loginCorreo').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();
  const divError = document.getElementById('mensajeErrorLogin');

  const resultado = loginUsuario(correo, pass);

  if (!resultado.exito) {
    divError.classList.remove('d-none');
    divError.innerHTML = resultado.mensaje;
    return;
  }

  divError.classList.add('d-none');
  alert(resultado.mensaje);
  if (typeof window !== 'undefined') {
    window.location.href = 'index.html';
  }
}

// ==========================================
// Handler Formulario Registro
// ==========================================
function procesarRegistro(e) {
  e.preventDefault();

  const run = document.getElementById('regRun').value.trim();
  const nombre = document.getElementById('regNombre').value.trim();
  const apellidos = document.getElementById('regApellidos').value.trim();
  const correo = document.getElementById('regCorreo').value.trim();
  const pass = document.getElementById('regPassword').value.trim();
  const divError = document.getElementById('mensajeErrorRegistro');

  const resultado = registrarUsuario({ run, nombre, apellidos, correo, password: pass });

  if (!resultado.exito) {
    divError.classList.remove('d-none');
    divError.innerHTML = resultado.mensaje;
    return;
  }

  divError.classList.add('d-none');
  alert(resultado.mensaje);
  if (typeof window !== 'undefined') {
    window.location.href = 'login.html';
  }
}

// ==========================================
// Handler Formulario Contacto
// ==========================================
function procesarContacto(e) {
  e.preventDefault();

  const nombre = document.getElementById('contactoNombre').value.trim();
  const correo = document.getElementById('contactoCorreo').value.trim();
  const comentario = document.getElementById('contactoComentario').value.trim();
  const divError = document.getElementById('mensajeErrorContacto');

  let errores = [];

  // Validación de nombre completo
  if (!nombre || nombre.length > 100) {
    errores.push('El nombre es obligatorio y no debe superar 100 caracteres.');
  }

  // Validación de correo opcional (si se ingresa, debe cumplir las reglas de dominio)
  if (correo && (correo.length > 100 || !validarCorreo(correo))) {
    errores.push('Si ingresas correo, debe ser de los dominios permitidos.');
  }

  // Validación de longitud del comentario
  if (!comentario || comentario.length > 500) {
    errores.push('El comentario es obligatorio y no debe superar 500 caracteres.');
  }

  if (errores.length > 0) {
    divError.classList.remove('d-none');
    divError.innerHTML = errores.join('<br>');
    return;
  }

  const mensajesGuardados = (() => {
    try {
      return JSON.parse(localStorage.getItem('viniLoveMensajes') || '[]');
    } catch (error) {
      return [];
    }
  })();

  mensajesGuardados.unshift({
    nombre,
    correo: correo || 'No indicado',
    comentario,
    fecha: new Date().toISOString()
  });

  localStorage.setItem('viniLoveMensajes', JSON.stringify(mensajesGuardados.slice(0, 20)));
  divError.classList.add('d-none');
  alert('¡Mensaje enviado correctamente! Se ha guardado en tu sistema local.');
  e.target.reset();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DOMINIOS_PERMITIDOS,
    CLAVE_USUARIOS,
    CLAVE_SESION,
    CLAVE_AVATAR,
    CLAVE_HISTORIAL_COMPRAS,
    validarCorreo,
    validarRUN,
    obtenerUsuarios,
    guardarUsuarios,
    obtenerUsuarioActual,
    guardarSesion,
    obtenerUsuarioRegistradoPorCorreo,
    obtenerHistorialCompras,
    guardarHistorialCompras,
    cerrarSesion,
    registrarUsuario,
    loginUsuario,
    actualizarEstadoAutenticacion,
    procesarLogin,
    procesarRegistro,
    procesarContacto
  };
}