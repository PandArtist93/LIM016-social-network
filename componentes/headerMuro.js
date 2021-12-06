import { cierreActividadUsuario } from '../firebase/funcionesAuth.js';

export const contenidoHeader = () => {
    const headerMuro = `
        <img src="imagenes/ImgUsuario.png" class="imagenUsuario">
        <img src="imagenes/CarePets.png" >
        <img src="imagenes/sign-out 1.png" id="cerrar-sesion"  >
    `;
    return headerMuro;
};

export const cerrarSesion = () => {
    const btnCerrarSesion = document.getElementById('cerrar-sesion'); 
    btnCerrarSesion.addEventListener('click', () => {
        cierreActividadUsuario()
        .then(() => {
            // Sign-out successful.
            window.location.hash = '#/inicio';
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    });
};
