import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { app } from './config.js';
import { actualizarDatosPerfil } from '../componentes/seccionEditarPerfil.js';

// inicializa el firestore
const db = getFirestore(app);
// referenciando la colección segun su nombre
const colRef = collection(db, 'usuarios');
// Obtener datos de la colección como array de objetos
getDocs(colRef)
  .then((snapshot) => {
    const usuarios = [];
    snapshot.docs.forEach((docs) => {
      usuarios.push({ ...docs.data(), id: docs.id });
    });
    // eslint-disable-next-line no-console
    console.log(usuarios);
  });
// agregar usuario a Firestore

export const agregarUsuarioConId = async (nuevoUsuario, nuevoCorreo, nuevaContraseña, id) => {
  const colRefId = doc(db, 'usuarios', id);
  // eslint-disable-next-line no-unused-vars
  const docRef = await setDoc(colRefId, {
    username: nuevoUsuario,
    correo: nuevoCorreo,
  }).then(() => {
    /* alert('agregado exito'); */
  });
};

/*-------------- Funcionalidad del perfil de usuario ------------------------*/
export const getCurrentUser = (userId) => {
  const colRefId = doc(db, 'usuarios', userId);
  return getDoc(colRefId);
}

export const actualizarPerfil = (userId, name, ubicacion, descripcion) => {
  const colRefId = doc(db, 'usuarios', userId);
  setDoc(colRefId, {
    name: name,
    ubicacion: ubicacion,
    descripcion: descripcion,
  }, { merge: true })
  .then(() => {
    const userData = JSON.parse(sessionStorage.userSession);
    userData.name = name;
    userData.ubicacion = ubicacion;
    userData.descripcion = descripcion;
    sessionStorage.setItem("userSession", JSON.stringify(userData));   
    actualizarDatosPerfil(name, ubicacion, descripcion);
  });
};


