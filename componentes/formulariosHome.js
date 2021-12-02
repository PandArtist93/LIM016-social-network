// Render de los formulario de registro e inicio que se imprimen en la vista de Home

import { registroUsuario } from '../firebase/funcionesAuth.js';
// Funcion que se encarga del registro por correo

export const registroCorreo = (nombre, correo, contraseña, selector) => {
  const registrarCon = document.getElementById(selector);
  registrarCon.addEventListener('submit', (e) => {
    e.preventDefault();
    // const usuarioRegistro = document.getElementById(nombre).value;
    const correoRegistro = document.getElementById(correo).value;
    const claveRegistro = document.getElementById(contraseña).value;
    registroUsuario(correoRegistro, claveRegistro)
      .then((userCredential) => {
        const ubicacionModalExito = document.getElementById("ubicacionModalExito");        
        ubicacionModalExito.innerHTML = modalExitoMensaje.modalExito();
      // Signed in
      // eslint-disable-next-line
        const user = userCredential.user;
      })
      .catch((error) => {
        // eslint-disable-next-line
        //const errorCode = error.code;
        // eslint-disable-next-line
        //const errorMessage = error.message;
        const ubicacionModalError = document.getElementById("ubicacionModalError");
        ubicacionModalError.innerHTML =  modalErrorMensaje.modalError();              
      });
  });
};

// Creacion de formularios de Home de forma dinamica
export const forms1 = {
  registro: () => {
    const formRegistro = `
        <div id='registro' class='cajaInterna2'>
            <form id="formRegistro">
                <div class="seccionIngreso">
                    <input type="text" id="usuarioRegistro" class="datosIngreso" placeholder="Nombre de usuario" required>
                    <img src="imagenes/user.png">
                </div>
                <div class="seccionIngreso">
                    <input type="text" id="correoRegistro" class="datosIngreso" placeholder="Correo electrónico" required>
                    <img src="imagenes/envelope.png">
                </div>

                <div class="seccionIngreso">
                    <input type="text" id="claveRegistro" class="datosIngreso" placeholder="Contraseña" required>
                    <img src="imagenes/eye-closed.png">
                </div>

                <button type="submit" class="iniciarSesion">Registrate</button>
                <p class="texto">¿Ya tienes una cuenta? <a id="registrate" href="#/inicio"> Iniciar Sesión</a></p> 
            </form> 
            <div id= "ubicacionModalExito"></div>
            <div id= "ubicacionModalError"></div>

        </div>`;
    return formRegistro;
  },
};

export const modalErrorMensaje = {
  modalError: () => {
    const errorMensaje = `
      <div class= "modalError" id="modalError">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Ingresaste los datos incorrectos</p>
      </div>
    `
    return errorMensaje;
  }
};

export const modalExitoMensaje = {
  modalExito: () => {
    const exitoMensaje = `
      <div class= "modalExito" id="modalExito">
        <i class="fas fa-check-circle"></i>
        <p>Revisa tu correo elétronico para confirmar registro</p>
      </div>
    `
    return exitoMensaje;
  }
};