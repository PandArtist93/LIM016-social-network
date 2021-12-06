// Render del formulario de registro que se imprimen en la vista de Home
// eslint-disable-next-line import/no-unresolved
import { addDoc } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { registroUsuario, envioCorreoVerificacion } from '../firebase/funcionesAuth.js';
import { modalRegistro } from './errores.js';
import { colRef } from '../firebase/funcionesFirestore.js';
import { mostrarYocultarClave } from './home.js';

// Creacion de formulario de registro de forma dinámica
export const formRegistros = () => {
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
        <input type="password" id="claveRegistro" class="datosIngreso" placeholder="Contraseña" required>
        <i id="botonClave" class="ph-eye-closed"></i>
      </div>

      <button type="submit" class="iniciarSesion">Registrate</button>
        
        <p class="texto">¿Ya tienes una cuenta? <a id="registrate" href="#/inicio"> Iniciar Sesión</a></p> 
      </form>
    </div>`;
  return formRegistro;
};


// Función que se encarga del registro por correo
export const registroCorreo = (nombre, selectorForm, containerError) => {
  mostrarYocultarClave('botonClave', 'claveRegistro');  // porque esta aca?

  const registrarCon = document.getElementById(selectorForm);
  registrarCon.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuarioRegistro = document.getElementById(nombre).value;
    const correoRegistro = document.getElementById('correoRegistro').value;
    const claveRegistro = document.getElementById('claveRegistro').value;
    const ubicacionModal = document.getElementById(containerError);

    registroUsuario(correoRegistro, claveRegistro)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
          envioCorreoVerificacion().then(() => {
            ubicacionModal.innerHTML = modalRegistro.exito();
            setTimeout(() => {
              const modalExito = document.getElementById("modalExito");   
              modalExito.style.display = "none";            
            }, 4000);   
          });
        }
        addDoc(colRef, {
          username: usuarioRegistro,
          correo: correoRegistro,
          clave: claveRegistro,
        })
          .then(() => {
            registrarCon.reset();
          });
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/invalid-email).') {
          ubicacionModal.innerHTML = modalRegistro.correoInvalido();
          setTimeout(() => {
            const modalCorreoInvalido = document.getElementById("modalCorreoInvalido");   
            modalCorreoInvalido.style.display = "none";            
          }, 4000);   
        } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          ubicacionModal.innerHTML = modalRegistro.contraseñaDebil();
          setTimeout(() => {
            const modalContraseñaDebil = document.getElementById("modalContraseñaDebil");   
            modalContraseñaDebil.style.display = "none";            
          }, 4000);  
        } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          ubicacionModal.innerHTML = modalRegistro.correoExistente();
          setTimeout(() => {
            const modalCorreoExistente = document.getElementById("modalCorreoExistente");   
            modalCorreoExistente.style.display = "none";            
          }, 4000);  
        } else {
          ubicacionModal.textContent = error.message;
        }
      });
  });
};
