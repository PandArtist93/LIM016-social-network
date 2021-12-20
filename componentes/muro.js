import { contenidoHeader, seccionModal } from './headerMuro.js';
import { seccionMuro1 } from './secionFirstMuro.js';
import { seccionMuro2 } from './seccionSecMuro.js';
import { contenidoPerfil } from './seccionPerfil.js';
import { contenidoEditarPerfil } from './seccionEditarPerfil.js';
import { contenidoCategoria } from './categorias.js';

export const muro = (/* parametro de la seccion2 */) => {
  const articleMuro = document.createElement('article');
  articleMuro.classList.add('artMuro');
  articleMuro.setAttribute('id', 'artMuro');

  const headerMuro = document.createElement('header');
  headerMuro.classList.add('item1');
  headerMuro.innerHTML = contenidoHeader();

  const seccionModalCategoria = document.createElement('div');
  seccionModalCategoria.classList.add('modalCategoria');
  seccionModalCategoria.innerHTML = seccionModal();

  const divSecciones = document.createElement('div');
  divSecciones.classList.add('grid-container');
  divSecciones.appendChild(seccionMuro1());
  divSecciones.appendChild(seccionMuro2()); // callback de la segunda seccion

  articleMuro.appendChild(headerMuro);
  articleMuro.appendChild(seccionModalCategoria);
  articleMuro.appendChild(divSecciones);
  return articleMuro;
};

export const muroPerfil = () => {
  const articleMuroPerfil = document.createElement('article');
  articleMuroPerfil.classList.add('artPerfil');
  articleMuroPerfil.setAttribute('id', 'artPerfil');

  const headerMuro = document.createElement('header');
  headerMuro.classList.add('item1');
  headerMuro.innerHTML = contenidoHeader();

  const seccionModalCategoria = document.createElement('div');
  seccionModalCategoria.classList.add('modalCategoria');
  seccionModalCategoria.innerHTML = seccionModal();

  const divSeccionPerfilusuario = document.createElement('div');
  divSeccionPerfilusuario.classList.add('contenedor-perfil');
  divSeccionPerfilusuario.appendChild(contenidoPerfil());

  articleMuroPerfil.appendChild(headerMuro);
  articleMuroPerfil.appendChild(seccionModalCategoria);
  articleMuroPerfil.appendChild(divSeccionPerfilusuario);

  return articleMuroPerfil;
};

export const muroEditarPerfil = () => {
  const articleMuroEditarPerfil = document.createElement('article');
  articleMuroEditarPerfil.classList.add('artEditarPerfil');
  articleMuroEditarPerfil.setAttribute('id', 'artEditarPerfil');

  const headerMuro = document.createElement('header');
  headerMuro.classList.add('item1');
  headerMuro.innerHTML = contenidoHeader();

  const seccionModalCategoria = document.createElement('div');
  seccionModalCategoria.classList.add('modalCategoria');
  seccionModalCategoria.innerHTML = seccionModal();

  const divSeccionEditarPerfilusuario = document.createElement('div');
  divSeccionEditarPerfilusuario.classList.add('contenedor-editarPerfil');
  divSeccionEditarPerfilusuario.appendChild(contenidoEditarPerfil());

  articleMuroEditarPerfil.appendChild(headerMuro);
  articleMuroEditarPerfil.appendChild(seccionModalCategoria);
  articleMuroEditarPerfil.appendChild(divSeccionEditarPerfilusuario);

  return articleMuroEditarPerfil;
};

export const seccionCategorias = (img, tituloCategoria) => {
  const articleRefugio = document.createElement('article');

  const headerMuro = document.createElement('header');
  headerMuro.classList.add('item1');
  headerMuro.innerHTML = contenidoHeader();

  const seccionModalCategoria = document.createElement('div');
  seccionModalCategoria.classList.add('modalCategoria');
  seccionModalCategoria.innerHTML = seccionModal();

  const divSecciones = document.createElement('div');
  divSecciones.classList.add('grid-container');
  divSecciones.appendChild(seccionMuro1());
  divSecciones.appendChild(contenidoCategoria(img, tituloCategoria));

  articleRefugio.appendChild(headerMuro);
  articleRefugio.appendChild(seccionModalCategoria);
  articleRefugio.appendChild(divSecciones);
  return articleRefugio;
};
