import { componentes } from '../lib/index.js';
import { forms1, registroCorreo } from '../componentes/formulariosHome.js';
import { forms2, inicioSesion } from '../componentes/inicioSesion.js';
import { divMuro } from '../componentes/muro.js';

export const vistasPantalla = () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/inicio':
      main.appendChild(componentes.fondoHome(forms2.inicioSesion()));
      inicioSesion('correoIngreso', 'claveIngreso', 'formIngreso');
      break;
    case '#/registro':
      main.appendChild(componentes.fondoHome(forms1.registro()));
      registroCorreo('usuarioRegistro', 'correoRegistro', 'claveRegistro', 'formRegistro');
      break;
    case '#/artmuro':
      main.innerHTML = divMuro;
      break;
    default:
      break;
  }
};
