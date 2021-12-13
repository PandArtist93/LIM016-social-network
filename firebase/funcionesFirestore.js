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

export const actualizarPerfil = (userId) => {
  const colRefId = doc(db, 'usuarios', userId);
  setDoc(colRefId, {
    name: "Marielena",
    ubicacion: "Lima",
    descripcion: "pruebas de la vida",
  }, { merge: true }).then(() => {
    //alert('actualizado con exito');
    //aca tenfria que actualizarlo si funciono el update en firestore
  });
};


