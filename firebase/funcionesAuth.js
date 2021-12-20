/* eslint-disable max-len */
import {
  auth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from './config.js';

// Crea un usuario con correo y contraseña
export const registroUsuario = (correo, contraseña) => createUserWithEmailAndPassword(auth, correo, contraseña);

// Ingreso de usuario con  correo y contraseña
export const inicioSesionUsuario = (correo, contraseña) => signInWithEmailAndPassword(auth, correo, contraseña);

// Ingreso del usuario con cuenta de Google
export const googleInicioSesion = (proveedor) => signInWithPopup(auth, proveedor);

// Ingreso del usuario con cuenta de Facebook
export const facebookInicioSesion = (proveedor) => signInWithPopup(auth, proveedor);

// Cerrar Sesion del usuario
export const cierreActividadUsuario = () => signOut(auth);

export const envioCorreoVerificacion = () => sendEmailVerification(auth.currentUser);

export const estadoAuthUsuario = (callback) => onAuthStateChanged(auth, callback);
//
/* export const envioClaveRecuperacion = (correo) => {
  const auth = getAuth(app);
  return sendPasswordResetEmail(auth, correo);
};
 */
