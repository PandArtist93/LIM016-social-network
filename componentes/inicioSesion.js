import {
  inicioSesionUsuario,
  googleInicioSesion,
  facebookInicioSesion,
  cierreActividadUsuario,
} from '../firebase/funcionesAuth.js';
import { proveedor, GoogleAuthProvider, proveedorFB } from '../firebase/config.js';
import { modalInicioSesion } from './errores.js';
import { mostrarYocultarClave } from './home.js';
import { obtenerById, agregarGoogleUser } from '../firebase/funcionesFirestore.js';

// Creacion de formulario de inicio de Sesión de forma dinámica
export const formInicioSesion = () => {
  const formIngreso = `
        <div id="inicio" class="cajaInterna2">
            <form id="formIngreso">
                <div class="seccionIngreso">
                    <input type="text" id="correoIngreso" class="datosIngreso" placeholder="Correo electrónico" required>
                    <i class="ph-envelope"></i>
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
  mostrarYocultarClave('botonContraseña', 'claveIngreso');
  cierreActividadUsuario();
  sessionStorage.clear();
  const iniciarCon = document.getElementById(selectorForm);
  iniciarCon.addEventListener('submit', (e) => {
    e.preventDefault();
    const correoIngreso = document.getElementById('correoIngreso').value;
    const claveIngreso = document.getElementById('claveIngreso').value;
    const ubicacionModal = document.getElementById(containerError);

    inicioSesionUsuario(correoIngreso, claveIngreso)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === true) {
          obtenerById(user.uid, 'usuarios').then((data) => {
            const dataa = data;
            dataa.id = user.uid;
            sessionStorage.setItem('userSession', JSON.stringify(dataa));
            window.location.hash = '#/artmuro';
          });
        } else {
          ubicacionModal.innerHTML = modalInicioSesion.confirmar();
          setTimeout(() => {
            const modales = document.getElementById('modalConfirmar');
            modales.style.display = 'none';
          }, 5000);
        }
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/invalid-email).' || error.message === 'Firebase: Error (auth/wrong-password).') {
          ubicacionModal.innerHTML = modalInicioSesion.datosInvalidos();
          setTimeout(() => {
            const modales = document.getElementById('modalDatosInvalidos');
            modales.style.display = 'none';
          }, 5000);
        } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          ubicacionModal.innerHTML = modalInicioSesion.usuarioInvalido();
          setTimeout(() => {
            const modales = document.getElementById('modalUsuarioInvalido');
            modales.style.display = 'none';
          }, 5000);
        } else {
          ubicacionModal.textContent = 'Ocurrió un error';
        }
      });
  });

  const botongoogle = document.getElementById('imgGoogle');
  botongoogle.addEventListener('click', () => {
    sessionStorage.clear();
    googleInicioSesion(proveedor)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        const googleUser = result.user;

        agregarGoogleUser(googleUser.uid, googleUser)
          .then(() => {
            const data = {
              correo: googleUser.email,
              username: googleUser.displayName,
              id: googleUser.uid,
              descripcion: '',
              name: '',
              ubicacion: ' ',
            };
            sessionStorage.setItem('userSession', JSON.stringify(data));
            window.location.hash = '#/artmuro';
          });
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        // console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // console.log(errorCode);

        // const errorMessage = error.message;
        // console.log((errorMessage));

        // const email = error.email;
        // console.log(email);

        const credential = GoogleAuthProvider.credentialFromError(error);
        // eslint-disable-next-line no-console
        console.log(credential);
      });
  });

  const botonFacebook = document.getElementById('imgFacebook');
  botonFacebook.addEventListener('click', () => {
    facebookInicioSesion(proveedorFB)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        // console.log(result);
        window.location.hash = '#/artmuro';
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        // console.log(user);
      });
  });
};
