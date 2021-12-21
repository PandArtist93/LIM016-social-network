import { fondoHome } from '../componentes/home.js';
import { formRegistros, registroCorreo } from '../componentes/registro.js';
import { formInicioSesion, inicioSesion } from '../componentes/inicioSesion.js';
import {
  muro,
  muroPerfil,
  muroEditarPerfil,
  seccionCategorias,
} from '../componentes/muro.js';
import { cerrarSesion, menuPuntosVerticales, modalCategorias } from '../componentes/headerMuro.js';
import { userState } from '../componentes/validaciones.js';
import { creacionPost } from '../componentes/seccionSecMuro.js';
import { btnEditarPerfil } from '../componentes/seccionEditarPerfil.js';

export const vistasPantalla = () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/inicio':
      main.appendChild(fondoHome(formInicioSesion()));
      inicioSesion('formIngreso', 'ubicacionModal');
      break;

    case '#/registro':
      main.appendChild(fondoHome(formRegistros()));
      registroCorreo('formRegistro', 'ubicacionModal');
      break;

    case '#/artmuro':
      userState();
      main.appendChild(muro());
      cerrarSesion();
      menuPuntosVerticales();
      creacionPost('formCompartir', 'container-post');
      modalCategorias();
      break;

    case '#/artrefugio':
      userState();
      main.appendChild(seccionCategorias('imagenes/iconoRefugioMascotas.png', 'Refugios'));
      cerrarSesion();
      menuPuntosVerticales();
      modalCategorias();
      break;

    case '#/artmascotasperdidas':
      userState();
      main.appendChild(seccionCategorias('imagenes/reportarIcono.png', 'Mascotas Perdidas'));
      cerrarSesion();
      menuPuntosVerticales();
      modalCategorias();
      break;

    case '#/artadoptar':
      userState();
      main.appendChild(seccionCategorias('imagenes/adoptarIcono.png', 'Adoptar'));
      cerrarSesion();
      menuPuntosVerticales();
      modalCategorias();
      break;

    case '#/artlugares':
      userState();
      main.appendChild(seccionCategorias('imagenes/localizacionIcono.png', 'Lugares'));
      cerrarSesion();
      menuPuntosVerticales();
      modalCategorias();
      break;

    case '#/artdonaciones':
      userState();
      main.appendChild(seccionCategorias('imagenes/medicinasIcono.png', 'Donaciones'));
      cerrarSesion();
      menuPuntosVerticales();
      modalCategorias();
      break;

    case '#/artperfil':
      userState();
      main.appendChild(muroPerfil());
      cerrarSesion();
      menuPuntosVerticales();
      modalCategorias();
      /* menuPuntosHorizontales(); */
      break;

    case '#/arteditarperfil':
      userState();
      main.appendChild(muroEditarPerfil());
      cerrarSesion();
      menuPuntosVerticales();
      modalCategorias();
      btnEditarPerfil();
      break;

    default:
      main.innerHTML = 'Página No Encontrada';
      break;
  }
};
