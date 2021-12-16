// Render del formulario de registro que se imprimen en la vista de Home
import { registroUsuario, envioCorreoVerificacion } from '../firebase/funcionesAuth.js';
import { modalRegistro } from './errores.js';
import { mostrarYocultarClave } from './home.js';
import { agregarDataUserFS } from '../firebase/funcionesFirestore.js';

// Creacion de formulario de registro de forma dinámica
export const formRegistros = () => {
  const formRegistro = `
    <div id='registro' class='cajaInterna2'>
      <form id="formRegistro">

      <div class="seccionIngreso">
        <input type="text" id="usuarioRegistro" class="datosIngreso" placeholder="Nombre de usuario" required>
        <i class="ph-user"></i>
      </div>

      <div class="seccionIngreso">
        <input type="text" id="correoRegistro" class="datosIngreso" placeholder="Correo electrónico" required>
        <i class="ph-envelope"></i>
      </div>

      <div class="seccionIngreso">
        <input type="password" id="claveRegistro" class="datosIngreso" placeholder="Contraseña" required>
        <i id="botonClave" class="ph-eye-closed"></i>
      </div>

      <div class="seccionCheckbox">
        <input type="checkbox" id="chequearRegistro" class="chequearRegistro" required/><label>Acepto los términos 
        y condiciones de las Polìticas de Privacidad.</label>
      </div>

      <button type="submit" class="iniciarSesion">Registrate</button>

        <p class="texto">¿Ya tienes una cuenta? <a id="registrate" href="#/inicio"> Iniciar Sesión</a></p> 
      </form>
    </div>`;
  return formRegistro;
};

// Función que se encarga del registro por correo
export const registroCorreo = (selectorForm, containerError) => {
  mostrarYocultarClave('botonClave', 'claveRegistro');
  const registrarCon = document.getElementById(selectorForm);
  registrarCon.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuarioRegistro = document.getElementById('usuarioRegistro').value;
    const correoRegistro = document.getElementById('correoRegistro').value;
    const claveRegistro = document.getElementById('claveRegistro').value;
    const ubicacionModal = document.getElementById(containerError);

    registroUsuario(correoRegistro, claveRegistro)
      .then((userCredential) => {
        const user = userCredential.user;
        envioCorreoVerificacion().then(() => {
          agregarDataUserFS(user.uid, usuarioRegistro, correoRegistro, '', '', '');
        });
        ubicacionModal.innerHTML = modalRegistro.exito();
        setTimeout(() => {
          const modalExito = document.getElementById('modalExito');
          modalExito.style.display = 'none';
          window.location.hash = '#/inicio';
        }, 5000);
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/invalid-email).') {
          ubicacionModal.innerHTML = modalRegistro.correoInvalido();
          setTimeout(() => {
            const modalCorreoInvalido = document.getElementById('modalCorreoInvalido');
            modalCorreoInvalido.style.display = 'none';
          }, 5000);
        } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          ubicacionModal.innerHTML = modalRegistro.contraseñaDebil();
          setTimeout(() => {
            const modalContraseñaDebil = document.getElementById('modalContraseñaDebil');
            modalContraseñaDebil.style.display = 'none';
          }, 5000);
        } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          ubicacionModal.innerHTML = modalRegistro.correoExistente();
          setTimeout(() => {
            const modalCorreoExistente = document.getElementById('modalCorreoExistente');
            modalCorreoExistente.style.display = 'none';
          }, 5000);
        } else {
          ubicacionModal.textContent = error.message;
        }
      });
  });
};
