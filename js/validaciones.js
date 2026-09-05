const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

function validarCorreo(correo) {
  if (!correo) return false;
  const partes = correo.split('@');
  if (partes.length !== 2) return false;
  return DOMINIOS_PERMITIDOS.includes(partes[1].toLowerCase());
}

function validarRUN(run) {
  const regexRUN = /^[0-9]{7,8}[0-9kK]{1}$/;
  return regexRUN.test(run);
}

// Handler Formulario Login
function procesarLogin(e) {
  e.preventDefault();
  const correo = document.getElementById('loginCorreo').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();
  const divError = document.getElementById('mensajeErrorLogin');

  let errores = [];
  if (!correo || correo.length > 100 || !validarCorreo(correo)) {
    errores.push("El correo debe ser válido y pertenecer a @duoc.cl, @profesor.duoc.cl o @gmail.com.");
  }
  if (!pass || pass.length < 4 || pass.length > 10) {
    errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
  }

  if (errores.length > 0) {
    divError.classList.remove('d-none');
    divError.innerHTML = errores.join('<br>');
  } else {
    divError.classList.add('d-none');
    alert("¡Inicio de sesión exitoso!");
  }
}

// Handler Formulario Registro
function procesarRegistro(e) {
  e.preventDefault();
  const run = document.getElementById('regRun').value.trim();
  const correo = document.getElementById('regCorreo').value.trim();
  const pass = document.getElementById('regPassword').value.trim();
  const divError = document.getElementById('mensajeErrorRegistro');

  let errores = [];
  if (!validarRUN(run)) {
    errores.push("El RUN debe ser sin puntos ni guion y tener un largo de 7 a 9 caracteres (ej: 19011022K).");
  }
  if (!correo || correo.length > 100 || !validarCorreo(correo)) {
    errores.push("El correo debe pertenecer a los dominios permitidos.");
  }
  if (!pass || pass.length < 4 || pass.length > 10) {
    errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
  }

  if (errores.length > 0) {
    divError.classList.remove('d-none');
    divError.innerHTML = errores.join('<br>');
  } else {
    divError.classList.add('d-none');
    alert("¡Usuario registrado exitosamente!");
  }
}

// Handler Formulario Contacto
function procesarContacto(e) {
  e.preventDefault();
  const nombre = document.getElementById('contactoNombre').value.trim();
  const correo = document.getElementById('contactoCorreo').value.trim();
  const comentario = document.getElementById('contactoComentario').value.trim();
  const divError = document.getElementById('mensajeErrorContacto');

  let errores = [];
  if (!nombre || nombre.length > 100) {
    errores.push("El nombre es obligatorio y no debe superar 100 caracteres.");
  }
  if (correo && (correo.length > 100 || !validarCorreo(correo))) {
    errores.push("Si ingresas correo, debe ser de los dominios permitidos.");
  }
  if (!comentario || comentario.length > 500) {
    errores.push("El comentario es obligatorio y no debe superar 500 caracteres.");
  }

  if (errores.length > 0) {
    divError.classList.remove('d-none');
    divError.innerHTML = errores.join('<br>');
  } else {
    divError.classList.add('d-none');
    alert("¡Mensaje enviado correctamente!");
  }
}