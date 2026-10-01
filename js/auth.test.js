const test = require('node:test');
const assert = require('node:assert/strict');

function createLocalStorageMock() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    }
  };
}

global.localStorage = createLocalStorageMock();

const auth = require('./validaciones.js');

test('registro e inicio de sesión guardan usuarios y sesión en localStorage', () => {
  localStorage.clear();

  const nuevoUsuario = {
    run: '19011022K',
    nombre: 'Ana',
    apellidos: 'García',
    correo: 'ana@gmail.com',
    password: '1234'
  };

  const registro = auth.registrarUsuario(nuevoUsuario);
  assert.equal(registro.exito, true);
  assert.equal(auth.obtenerUsuarios().length, 1);

  const sesion = auth.loginUsuario('ana@gmail.com', '1234');
  assert.equal(sesion.exito, true);
  assert.equal(auth.obtenerUsuarioActual().correo, 'ana@gmail.com');

  const loginFallido = auth.loginUsuario('ana@gmail.com', 'wrong');
  assert.equal(loginFallido.exito, false);
});

test('el admin debe poder iniciar sesión aunque exista un registro corrupto previo con el mismo correo', () => {
  localStorage.clear();

  const usuariosPrevios = [{
    run: '12345678K',
    nombre: 'Viejo',
    apellidos: 'Registro',
    correo: 'Viniowner@vinilove.com',
    password: 'incorrecta',
    rol: 'cliente'
  }];

  localStorage.setItem('viniLoveUsuarios', JSON.stringify(usuariosPrevios));

  const resultado = auth.loginUsuario('Viniowner@vinilove.com', 'Viniadmin123');

  assert.equal(resultado.exito, true);
  assert.equal(resultado.usuario.rol, 'admin');
  assert.equal(auth.obtenerUsuarioActual().correo, 'viniowner@vinilove.com');
});
