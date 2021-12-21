import { cierreActividadUsuario } from '../firebase/funcionesAuth.js';
import { validateSessionStorage } from './validaciones.js';

// Renderizando el header
export const contenidoHeader = () => {
  const userData = validateSessionStorage();
  const headerMuro = `
        <div class="enlacePerfil">
            <img src="${userData.imgUsuario}" class="imagenUsuario">
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

// Funcion de boton cerrar sesion, limpiando el sessionStorage
// redirige a inicio
export const cerrarSesion = () => {
  const btnCerrarSesion = document.getElementById('cerrar-sesion');
  btnCerrarSesion.addEventListener('click', () => {
    cierreActividadUsuario()
      .then(() => {
        sessionStorage.clear();
        window.location.hash = '#/inicio';
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  });
};

// Funcionalidad de menu puntos verticales
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

// Renderizando modal categorias
export const seccionModal = () => {
  const seccionModalCategoria = `<section class="seccionModal">
    <div class="tituloModal">
      <h1>Grupos</h1>
      <span class="btnCerrar">&times;</span>
    </div>
    <div class= "contenedorCategorias">
        <a href="#/artrefugio" class="categoriaUnica">
            <img src="imagenes/iconoRefugioMascotas.png" >
            <p>Refugios</p>
        <a>
        <a href="#/artmascotasperdidas" class="categoriaUnica">
            <img src="imagenes/reportarIcono.png" >
            <p>Mascotas Perdidas</p>
        </a>
        <a href="#/artadoptar" class="categoriaUnica">
            <img src="imagenes/adoptarIcono.png" >
            <p>Adoptar</p>
        </a>
        <a href="#/artlugares" class="categoriaUnica">
            <img src="imagenes/localizacionIcono.png" >
            <p>Lugares</p>
        </a>
        <a href="#/artdonaciones" class="categoriaUnica">
            <img src="imagenes/medicinasIcono.png" >
            <p>Donaciones</p>
        </a>
    </div>
    </section>`;
  return seccionModalCategoria;
};

// funcionalidad de modal categorias
export const modalCategorias = () => {
  const modalCategoria = document.querySelector('.modalCategoria');
  const abrirModal = document.querySelector('.abrirModal');
  const btnCerrar = document.querySelector('.btnCerrar');

  abrirModal.addEventListener('click', () => {
    modalCategoria.style.display = 'block';
  });

  btnCerrar.addEventListener('click', () => {
    modalCategoria.style.display = 'none';
  });

  /* outside click */
  window.addEventListener('click', (e) => {
    // eslint-disable-next-line eqeqeq
    if (e.target == modalCategoria) {
      modalCategoria.style.display = 'none';
    }
  });
};
