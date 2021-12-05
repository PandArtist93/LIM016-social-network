import { componentes } from '../lib/index.js';
import { formRegistro, registroCorreo } from '../componentes/registro.js';
import { formInicioSesion, inicioSesion } from '../componentes/inicioSesion.js';
import { divMuro } from '../componentes/muro.js';
import { auth } from '../firebase/funcionesAuth.js';
import { userState } from '../componentes/validaciones.js';

export const vistasPantalla = () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  switch (window.location.hash.toLowerCase()) {
    case '': case '#/': case '#/inicio':
      console.log(auth);
      main.appendChild(componentes.fondoHome(formInicioSesion()));
      inicioSesion('formIngreso', 'ubicacionModal');  
      break;
    
    case '#/registro':
      main.appendChild(componentes.fondoHome(formRegistro()));
      registroCorreo('usuarioRegistro', 'formRegistro', 'ubicacionModal');
      break;

    case '#/artmuro':
      userState();
      main.innerHTML = divMuro;
      break;

    default:
      main.innerHTML='paginaNo encontrada';
      break;
  }
};
