import {
  inicioSesionUsuario,
  googleInicioSesion,
  facebookInicioSesion,
  cierreActividadUsuario,
} from '../firebase/funcionesAuth.js';
import { proveedor, GoogleAuthProvider, proveedorFB } from '../firebase/config.js';
import { modalInicioSesion } from './errores.js';
import { mostrarYocultarClave } from './home.js';
import {
  obtenerById, agregarGoogleUser, agregarFacebookUser, searchUser,
} from '../firebase/funcionesFirestore.js';

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
  mostrarYocultarClave('botonContraseña', 'claveIngreso'); // funcion de mostrar y ocultar contraseña
  cierreActividadUsuario(); // ve que no hay actividad de usuario
  sessionStorage.clear(); // limpia el Storage
  const iniciarCon = document.getElementById(selectorForm);
  iniciarCon.addEventListener('submit', (e) => {
    e.preventDefault();
    const correoIngreso = document.getElementById('correoIngreso').value;
    const claveIngreso = document.getElementById('claveIngreso').value;
    // se llama al contenedor de los modales error
    const ubicacionModal = document.getElementById(containerError);

    inicioSesionUsuario(correoIngreso, claveIngreso)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === true) {
          // obtener data del usuario logueado para agregar al sessionStorage
          obtenerById(user.uid, 'usuarios').then((data) => {
            const dataa = data;
            dataa.id = user.uid;
            sessionStorage.setItem('userSession', JSON.stringify(dataa));
            window.location.hash = '#/artmuro';
          });
        } else {
          // muestra mensaje de error si no verifico por correo
          ubicacionModal.innerHTML = modalInicioSesion.confirmar();
          setTimeout(() => {
            const modales = document.getElementById('modalConfirmar');
            modales.style.display = 'none';
          }, 5000);
        }
      })
      .catch((error) => {
        // se establece todos los mensajes de error
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

  // inicio sesion con proveedor google
  const botongoogle = document.getElementById('imgGoogle');
  botongoogle.addEventListener('click', () => {
    sessionStorage.clear();
    googleInicioSesion(proveedor)
      .then((result) => {
        const googleUser = result.user;
        searchUser(result.user.uid)
          .then((user) => {
            if (user.exists()) {
              const data = user.data();
              data.id = googleUser.uid;
              sessionStorage.setItem('userSession', JSON.stringify(data));
              window.location.hash = '#/artmuro';
              return;
            }
            agregarGoogleUser(googleUser.uid, googleUser)
              .then(() => {
                const data = {
                  correo: googleUser.email,
                  username: googleUser.displayName,
                  id: googleUser.uid,
                  descripcion: '',
                  name: '',
                  ubicacion: ' ',
                  imgUsuario: googleUser.photoURL,
                  imgPortada: 'imagenes/ImgDelUsuario.png',
                };
                // agregando datos al sessionStorage
                sessionStorage.setItem('userSession', JSON.stringify(data));
                window.location.hash = '#/artmuro';
              });
          });
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        // eslint-disable-next-line no-console
        console.log(credential);
      });
  });

  // inicio sesion con proveedor facebook
  const botonFacebook = document.getElementById('imgFacebook');
  botonFacebook.addEventListener('click', () => {
    facebookInicioSesion(proveedorFB)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        const facebookUser = result.user;
        searchUser(result.user.uid)
          .then((user) => {
            if (user.exists()) {
              const data = user.data();
              data.id = facebookUser.uid;
              sessionStorage.setItem('userSession', JSON.stringify(data));
              window.location.hash = '#/artmuro';
              return;
            }
            agregarFacebookUser(facebookUser.uid, facebookUser)
              .then(() => {
                const data = {
                  correo: facebookUser.email,
                  username: facebookUser.displayName,
                  id: facebookUser.uid,
                  descripcion: '',
                  name: '',
                  ubicacion: ' ',
                  imgUsuario: facebookUser.photoURL,
                  imgPortada: 'imagenes/ImgDelUsuario.png',
                };
                // agregando datos al sessionStorage
                sessionStorage.setItem('userSession', JSON.stringify(data));
                window.location.hash = '#/artmuro';
              });
          });
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // console.log(user);
      });
  });
};
