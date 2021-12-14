import { componentes } from '../lib/index.js';
import { formRegistros, registroCorreo } from '../componentes/registro.js';
import { formInicioSesion, inicioSesion } from '../componentes/inicioSesion.js';
import { muro, muroPerfil, muroEditarPerfil } from '../componentes/muro.js';
import { cerrarSesion, menuPuntosVerticales } from '../componentes/headerMuro.js';
import { userState } from '../componentes/validaciones.js';
import { menuPuntosHorizontales, publicarHome } from '../componentes/seccionSecMuro.js';
import { btnEditarPerfil } from '../componentes/seccionEditarPerfil.js';

export const vistasPantalla = () => {
  const main = document.getElementById('main');
  console.log(window.location.hash.toLowerCase());
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/inicio':
      main.appendChild(componentes.fondoHome(formInicioSesion()));
      inicioSesion('formIngreso', 'ubicacionModal');
      break;

    case '#/registro':
      main.appendChild(componentes.fondoHome(formRegistros()));
      registroCorreo('formRegistro', 'ubicacionModal');
      break;

    case '#/artmuro':
      userState();
      main.appendChild(muro());
      cerrarSesion();
      menuPuntosVerticales();
      publicarHome('formCompartir', 'container-post');
      break;

    case '#/artperfil':
      userState();
      main.appendChild(muroPerfil());
      cerrarSesion();
      menuPuntosVerticales();
      menuPuntosHorizontales();      
      break;

    case '#/arteditarperfil':
      console.log(muroEditarPerfil());
      userState();
      main.appendChild(muroEditarPerfil());      
      cerrarSesion();
      menuPuntosVerticales();
      btnEditarPerfil();
      break;

    default:
      main.innerHTML = 'Página No Encontrada';
      break;
  }
};
