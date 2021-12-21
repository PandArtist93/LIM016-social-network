import { estadoAuthUsuario } from '../firebase/funcionesAuth.js';

// Funcion que permite al usuario ingresar solo si esta logueado
export const userState = () => {
  estadoAuthUsuario((user) => {
    if (user === null || user === undefined) {
      window.location.hash = '#/inicio';
    }
  });
};

// Funcion para llamar al sessionStorage
export const validateSessionStorage = () => {
  let userData = sessionStorage.getItem('userSession');
  // console.log(userData);
  if (!userData) {
    userData = {
      username: '',
      name: '',
      corre: '',
      descripcion: '',
      ubicacion: '',
    };
  } else {
    userData = JSON.parse(sessionStorage.userSession);
  }
  return userData;
};

/* export const borrarCache = (section) => {
  section.in
} */
