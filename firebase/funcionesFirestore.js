import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  query, 
  orderBy, 
  serverTimestamp,
  where,
  deleteDoc
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { app } from './config.js';
// eslint-disable-next-line import/no-cycle
import { actualizarDatosPerfil } from '../componentes/seccionEditarPerfil.js';

// inicializa el firestore
const db = getFirestore(app);
// referenciando la colección segun su nombre
const colRefs = collection(db, 'usuarios');
// Obtener datos de la colección como array de objetos
getDocs(colRefs)
  .then((snapshot) => {
    const usuarios = [];
    snapshot.docs.forEach((docs) => {
      usuarios.push({ ...docs.data(), id: docs.id });
    });
    // eslint-disable-next-line no-console
    //console.log(usuarios);
  });
// Obtener todos los documentos de la coleccion 'home' de firestore y mandarlo como array de objetos
export const obtenerPosts = async () => {
  const colRef = collection(db, 'home');
  const q = query(colRef, orderBy('timestamp'));
  const querySnapshot = await getDocs(q).then((snapshot) => {
    const usuarios = [];
    snapshot.docs.forEach((docs) => {
      usuarios.push({ ...docs.data(), postId: docs.id });
    });
    //console.log(usuarios);
    return usuarios;
  });
  return querySnapshot;
};
// Obtener la data de cada usuario guardado en Firestore, lo buscamos por id
export const obtenerUsuarioById = async (idUser) => {
  const docRef = doc(db, 'usuarios', idUser);
  const querySnapshot = await getDoc(docRef).then((docs) => docs.data());
  return querySnapshot;
};
// Obtener una publicacion por su id

export const obtenerPostById = async (byId) => {
  const postsHome = doc(db, 'home', byId);
  const datos = await getDoc(postsHome).then((key) => key.data());
  return datos;
};

// Agregar data inicial al momento de registro a la coleccion usuarios
export const agregarDataUserFS = async (id, Username, Correo, Name, Descripcion, Ubicacion) => {
  const colRefId = doc(db, 'usuarios', id);
  await setDoc(colRefId, {
    username: Name,
    correo: Correo,
    ubicacion: Ubicacion,
    name: Username,
    descripcion: Descripcion
  });
};

export const subirPostA = async (nameCol, idUser, post) => {
  const colRefPost = collection(db, nameCol);
  const functionAdd = await addDoc(colRefPost, {
    usuarioId: idUser,
    publicacion: post,
    timestamp: serverTimestamp(),
  });
  return functionAdd;
};

/* -------------- Funcionalidad del perfil de usuario ------------------------*/
/* export const getCurrentUser = (userId) => {
  const colRefId = doc(db, 'usuarios', userId);
  return getDoc(colRefId);
}; */

export const actualizarPerfil = (userId, name, username, ubicacion, descripcion) => {
  const colRefId = doc(db, 'usuarios', userId);
  return updateDoc(colRefId, {
    username: username,
    name: name,    
    ubicacion: ubicacion,
    descripcion: descripcion
  });
};

/*---------------  Agregar  usuario a firestore desde boton de google -----------------------*/
export const agregarGoogleUser = (id, user) => {
  const colRefId = doc(db, 'usuarios', id);
  return setDoc(colRefId, {
    username: user.displayName,
    correo: user.email
  })
};
/* Buscar posts creados por el usuario logueado */
export const obtenerUserPosts = async () => {
  const userId = JSON.parse(sessionStorage.userSession).id;
  const colRef = collection(db, 'home');
  const q = query(colRef, where("usuarioId", "==", userId));
  const querySnapshot = await getDocs(q);
  let posts = []
  const values = querySnapshot.forEach((doc) => {
    posts.push({...doc.data(), id: doc.id});
  });
  return posts;
};
/* Eliminar un post de con respecto al postId */
/* export const deletePostById = async (postId) => {
  await deleteDoc(doc(db, "home", postId),
};
 */
