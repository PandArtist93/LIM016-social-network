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
  where,
  serverTimestamp,
  deleteDoc
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { app } from './config.js';

// inicializa el firestore
const db = getFirestore(app);

// Obtener todos los documentos de la coleccion 'home' de firestore y mandarlo como array de objetos
export const obtenerPosts = async () => {
  const colRef = collection(db, 'home');
  const q = query(colRef, orderBy('timestamp'));
  const querySnapshot = await getDocs(q).then((snapshot) => {
    const posts = [];
    snapshot.docs.forEach((docs) => {
      posts.push({ ...docs.data(), postId: docs.id });
    });
    return posts;
  });
  return querySnapshot;
};

// Obtener la data de cada usuarui guardado en Firestore, lo buscamos por id
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

export const subirPostA = async (nameCol, idUser, post, creadorPost, descripcionPost) => {
  const colRefPost = collection(db, nameCol);
  const functionAdd = await addDoc(colRefPost, {
    usuarioId: idUser,
    publicacion: post,
    creador: creadorPost,
    descripcion: descripcionPost,
    timestamp: serverTimestamp(),
  });
  return functionAdd;
};

export const actualizarDatosPost = async (userId, creadorPost, descripcionPost) => {
  const colRef = collection(db, 'home');
  // Create a query against the collection.
  const q = query(colRef, where('usuarioId', '==', userId));
  await getDocs(q).then((snapshot) => {
    snapshot.forEach((el) => {
      const colRefId = doc(db, 'home', el.id);
      updateDoc(colRefId, {
        creador: creadorPost,
        descripcion: descripcionPost,
      });
    });
  });
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
/*---------------- Buscar posts creados por el usuario logueado--------------------------- */
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
/*---------------- Eliminar un post de con respecto al postId-------------------------- */
export const eliminarPost = async (postId) => {
  await deleteDoc(doc(db, "home", postId)
)}

