// eslint-disable-next-line import/no-unresolved
import { cierreSesionUsuario } from '../firebase/funcionesAuth.js';

export const cerrarSesion = () => {
    const btnCerrarSesion = document.getElementById("cerrar-sesion"); 
    btnCerrarSesion.addEventListener("click", () =>{
        cierreSesionUsuario()
        .then(() => {
            // Sign-out successful.
            window.location.hash = '#/inicio';
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    });
}
