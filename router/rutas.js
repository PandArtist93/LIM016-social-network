import { componentes } from '../lib/index.js';
import { formRegistros, registroCorreo } from '../componentes/registro.js';
import { formInicioSesion, inicioSesion } from '../componentes/inicioSesion.js';
import { divMuro } from '../componentes/muro.js';
import { cerrarSesion } from '../componentes/cerrarSesion.js';
import { auth } from '../firebase/funcionesAuth.js';

export const vistasPantalla = () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/inicio':
      //console.log(auth);
      main.appendChild(componentes.fondoHome(formInicioSesion()));
      inicioSesion('formIngreso', 'ubicacionModal');
      break;
    case '#/registro':
      main.appendChild(componentes.fondoHome(formRegistros()));
      registroCorreo('usuarioRegistro', 'formRegistro', 'ubicacionModal');
      break;
    case '#/artmuro':
      main.innerHTML = divMuro;
      cerrarSesion();
      break;
    default:
      break;
  }
};
