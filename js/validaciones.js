// Definición de dominios de correo institucional y personal autorizados
const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

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

// ==========================================
// Handler Formulario Login
// ==========================================
function procesarLogin(e) {
  e.preventDefault(); // Evita el recargo de la página por el envío predeterminado del formulario
  
  const correo = document.getElementById('loginCorreo').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();
  const divError = document.getElementById('mensajeErrorLogin');

  let errores = [];

  // Validación de correo (Obligatorio, máximo 100 caracteres y dominio válido)
  if (!correo || correo.length > 100 || !validarCorreo(correo)) {
    errores.push("El correo debe ser válido y pertenecer a @duoc.cl, @profesor.duoc.cl o @gmail.com.");
  }

  // Validación de contraseña (Obligatoria, entre 4 y 10 caracteres)
  if (!pass || pass.length < 4 || pass.length > 10) {
    errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
  }

  // Renderizado de mensajes de error o confirmación de éxito
  if (errores.length > 0) {
    divError.classList.remove('d-none');
    divError.innerHTML = errores.join('<br>');
  } else {
    divError.classList.add('d-none');
    alert("¡Inicio de sesión exitoso!");
  }
}

// ==========================================
// Handler Formulario Registro
// ==========================================
function procesarRegistro(e) {
  e.preventDefault(); // Detiene el comportamiento de submit nativo
  
  const run = document.getElementById('regRun').value.trim();
  const correo = document.getElementById('regCorreo').value.trim();
  const pass = document.getElementById('regPassword').value.trim();
  const divError = document.getElementById('mensajeErrorRegistro');

  let errores = [];

  // Validación del formato del RUN
  if (!validarRUN(run)) {
    errores.push("El RUN debe ser sin puntos ni guion y tener un largo de 7 a 9 caracteres (ej: 19011022K).");
  }

  // Validación del correo institucional / permitido
  if (!correo || correo.length > 100 || !validarCorreo(correo)) {
    errores.push("El correo debe pertenecer a los dominios permitidos.");
  }

  // Validación del rango de caracteres de la contraseña
  if (!pass || pass.length < 4 || pass.length > 10) {
    errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
  }

  // Muestra del contenedor de alertas en caso de existir fallos
  if (errores.length > 0) {
    divError.classList.remove('d-none');
    divError.innerHTML = errores.join('<br>');
  } else {
    divError.classList.add('d-none');
    alert("¡Usuario registrado exitosamente!");
  }
}

// ==========================================
// Handler Formulario Contacto
// ==========================================
function procesarContacto(e) {
  e.preventDefault(); // Detiene el envío del formulario
  
  const nombre = document.getElementById('contactoNombre').value.trim();
  const correo = document.getElementById('contactoCorreo').value.trim();
  const comentario = document.getElementById('contactoComentario').value.trim();
  const divError = document.getElementById('mensajeErrorContacto');

  let errores = [];

  // Validación de nombre completo
  if (!nombre || nombre.length > 100) {
    errores.push("El nombre es obligatorio y no debe superar 100 caracteres.");
  }

  // Validación de correo opcional (si se ingresa, debe cumplir las reglas de dominio)
  if (correo && (correo.length > 100 || !validarCorreo(correo))) {
    errores.push("Si ingresas correo, debe ser de los dominios permitidos.");
  }

  // Validación de longitud del comentario
  if (!comentario || comentario.length > 500) {
    errores.push("El comentario es obligatorio y no debe superar 500 caracteres.");
  }

  // Despliegue dinámico de notificaciones de estado
  if (errores.length > 0) {
    divError.classList.remove('d-none');
    divError.innerHTML = errores.join('<br>');
  } else {
    divError.classList.add('d-none');
    alert("¡Mensaje enviado correctamente!");
  }
}