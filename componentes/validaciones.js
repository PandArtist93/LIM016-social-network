import { estadoAuthUsuario } from '../firebase/funcionesAuth.js';

export const userState = () => {
  estadoAuthUsuario((user) => {
    if (user === null || user === undefined) {
      window.location.hash = '#/inicio';
    }
  });
};

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
