import { cierreActividadUsuario } from '../firebase/funcionesAuth.js';
import { validateSessionStorage } from './validaciones.js';

export const contenidoHeader = () => {
  const userData = validateSessionStorage();
  //sessionStorage.setItem('userSession', JSON.stringify(data));
  //const userData = JSON.parse(sessionStorage.userSession);
  const headerMuro = `
        <div class="enlacePerfil">
            <img src="imagenes/ImgUsuario.png" class="imagenUsuario">
            <p class="nombreUsuario"><a id="perfil" href="#/artperfil">${userData.username}</a></p>
        </div>
        <img src="imagenes/CarePets.svg" class="titulo-header">
        <div class="puntosVerticales">
          <figure></figure>
          <figure class="middle"></figure>
          <p class="equis"></p>
          <figure></figure>
          <ul class="desplegable">
            <li><a id="tema"><img src="imagenes/bx-palette.png"><span>Tema</span></a></li>
            <li><a id="cerrar-sesion"><img src="imagenes/sign-out.png"><span>Cerrar Sesión</span></a></li>
          </ul>
        </div>
      `;
  return headerMuro;
};

export const cerrarSesion = () => {
  const btnCerrarSesion = document.getElementById('cerrar-sesion');
  btnCerrarSesion.addEventListener('click', () => {
    cierreActividadUsuario()
      .then(() => {
        // Sign-out successful.
        sessionStorage.clear();
        window.location.hash = '#/inicio';
      }).catch((error) => {
        // An error happened.
        // eslint-disable-next-line no-console
        console.log(error);
      });
  });
};

export const menuPuntosVerticales = () => {
  const puntosVerticales = document.querySelector('.puntosVerticales');
  const middle = document.querySelector('.middle');
  const equis = document.querySelector('.equis');
  const desplegable = document.querySelector('.desplegable');

  puntosVerticales.addEventListener('click', () => {
    middle.classList.toggle('active');
    equis.classList.toggle('active');
    desplegable.classList.toggle('active');
  });
};
