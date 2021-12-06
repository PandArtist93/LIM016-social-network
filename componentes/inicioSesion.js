// eslint-disable-next-line import/no-unresolved
import { GoogleAuthProvider, FacebookAuthProvider } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { inicioSesionUsuario, googleInicioSesion, facebookInicioSesion } from '../firebase/funcionesAuth.js';
import { modalInicioSesion } from './errores.js';
import { mostrarYocultarClave } from './home.js';

// Creacion de formulario de inicio de Sesión de forma dinámica
export const formInicioSesion = () => {
  const formIngreso = `
        <div id="inicio" class="cajaInterna2">
            <form id="formIngreso">
                <div class="seccionIngreso">
                    <input type="text" id="correoIngreso" class="datosIngreso" placeholder="Correo electrónico" required>
                        <img src="imagenes/envelope.png">
                </div>
                
                <div class="seccionIngreso">
                    <input type="password" id="claveIngreso" class="datosIngreso" placeholder="Contraseña" required>
                    <i id="botonContraseña" class="ph-eye-closed"></i>
                </div>
                
                <button type="submit" id="botonIngresar" class="iniciarSesion">Ingresar</button>
                            
                <p class="texto">O bien ingresa con</p>
                
                <div class="logosInicio">
                    <img id="imgFacebook" src="imagenes/FacebookOriginal.png">
                    <img id="imgGoogle" src="imagenes/GoogleOriginal.png">
                </div>
                
                <p class="texto">¿No tienes una cuenta? <a id="registrate" href="#/registro"> Regístrate</a></p> 
            </form> 
        </div>`;
  return formIngreso;
};


// Función que se encarga del inicio de Sesión por correo
export const inicioSesion = (selectorForm, containerError) => {
  mostrarYocultarClave('botonContraseña', 'claveIngreso');  // por que esta aca? 

  const iniciarCon = document.getElementById(selectorForm);
  iniciarCon.addEventListener('submit', (e) => {
    e.preventDefault();
    const correoIngreso = document.getElementById('correoIngreso').value;
    const claveIngreso = document.getElementById('claveIngreso').value;
    const ubicacionModal = document.getElementById(containerError);
    inicioSesionUsuario(correoIngreso, claveIngreso)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user.emailVerified === true) {
          window.location.hash = '#/artmuro';
        } else {
          ubicacionModal.innerHTML = modalInicioSesion.confirmar();
          setTimeout(() => {
            const modalConfirmar = document.getElementById("modalConfirmar");   
            modalConfirmar.style.display = "none";            
          }, 4000);          
        }
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/invalid-email).' || error.message === 'Firebase: Error (auth/wrong-password).') {
          ubicacionModal.innerHTML = modalInicioSesion.datosInvalidos();
          setTimeout(() => {
            const modalDatosInvalidos = document.getElementById("modalDatosInvalidos");   
            modalDatosInvalidos.style.display = "none";            
          }, 4000);   
        } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          ubicacionModal.innerHTML = modalInicioSesion.usuarioInvalido();
          setTimeout(() => {
            const modalUsuarioInvalido = document.getElementById("modalUsuarioInvalido");   
            modalUsuarioInvalido.style.display = "none";            
          }, 4000);   
        } else {
          ubicacionModal.textContent = error.message;
        }
      });
  });

  const botongoogle = document.getElementById('imgGoogle');
  botongoogle.addEventListener('click', () => {
    const proveedor = new GoogleAuthProvider();
    googleInicioSesion(proveedor)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        //console.log(result);
        window.location.hash = '#/artmuro';
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;        
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log((errorMessage));
        // The email of the user's account used.
        const email = error.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  });

  const botonFacebook = document.getElementById('imgFacebook');
  botonFacebook.addEventListener('click', () => {
    const proveedor = new FacebookAuthProvider();
    facebookInicioSesion(proveedor)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        console.log(result);
        window.location.hash = '#/artmuro';
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //const credential = FacebookAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        console.log(user);        
      })
      .catch((error) => {
        // Handle Errors here.
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  });
};

