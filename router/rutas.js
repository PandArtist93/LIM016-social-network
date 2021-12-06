import { componentes } from '../lib/index.js';
import { formRegistros, registroCorreo } from '../componentes/registro.js';
import { formInicioSesion, inicioSesion } from '../componentes/inicioSesion.js';
import { muro } from '../componentes/muro.js';
import { cerrarSesion } from '../componentes/headerMuro.js';
import { userState } from '../componentes/validaciones.js';

export const vistasPantalla = () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/inicio':
      main.appendChild(componentes.fondoHome(formInicioSesion()));
      inicioSesion('formIngreso', 'ubicacionModal');
      break;

    case '#/registro':
      main.appendChild(componentes.fondoHome(formRegistros()));
      registroCorreo('usuarioRegistro', 'formRegistro', 'ubicacionModal');
      break;

    case '#/artmuro':
      userState();
      main.appendChild(muro());
      cerrarSesion();
      break;

    default:
      main.innerHTML = 'paginaNo encontrada';
      break;
  }
};
