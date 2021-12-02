/* eslint-disable import/no-unresolved */
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { app } from './config.js';

// Crea un usuario con correo y contraseña
export const registroUsuario = (correo, contraseña) => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, correo, contraseña)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  });
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
  signInWithPopup(auth, proveedorGoogle)
    .then((result) => {
    // This gives you a Google Access Token.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const ubicacionModalExito = document.getElementById("ubicacionModalExito");        
    ubicacionModalExito.innerHTML = modalExitoMensaje.modalExito();
    console.log(token);
    // The signed-in user info.
    const user = result.user;
    console.log(user);
  });
};



const modalExitoMensaje = {
  modalExito: () => {
    const exitoMensaje = `
      <div class= "modalExito" id="modalExito">
      <i class="fas fa-check-circle" ></i>
        <p>Inicio de Sesión exitoso!</p>
      </div>
    `
    return exitoMensaje;
  }
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
