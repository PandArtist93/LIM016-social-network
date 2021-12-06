import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { app } from './config.js';

// inicializa el firestore
const db = getFirestore(app);
// referenciando la coleeción segun su nombre
export const colRef = collection(db, 'usuarios');
// Obtener datos de la colección como array de objetos
getDocs(colRef)
  .then((snapshot) => {
    const usuarios = [];
    snapshot.docs.forEach((doc) => {
      usuarios.push({ ...doc.data(), id: doc.id });
    });
    console.log(usuarios);
  });
// agregar usuario a Firestore
export const agregarUsuario = (nuevoUsuario, nuevoCorreo, nuevaContraseña) => {
  addDoc(colRef, {
    username: nuevoUsuario,
    correo: nuevoCorreo,
    clave: nuevaContraseña,
  });
};
