/* eslint-disable import/no-unresolved */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { app } from './config.js';

// Crea un usuario con correo y contraseña
export const registroUsuario = (correo, contraseña) => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, correo, contraseña);
};

// Ingreso de usuario con  correo y contraseña
export const inicioSesionUsuario = (correo, contraseña) => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, correo, contraseña);
};

// Ingreso del usuario con cuenta de Google
export const googleInicioSesion = () => {
  const proveedorGoogle = new GoogleAuthProvider();
  const auth = getAuth(app);
  // eslint-disable-next-line no-undef
  const inicioConGoogle = signInWithPopup(auth, proveedorGoogle);
  return inicioConGoogle;
};

//
export const envioClaveRecuperacion = (correo) => {
  const auth = getAuth(app);
  return sendPasswordResetEmail(auth, correo);
};

//
/* export const envioCorreoVerificacion= () => firebase.auth().currentUser.sendEmailVerification();

//
export const onAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);
export const signOut = () => firebase.auth().signOut(); */
