/* eslint-disable max-len */
import {
  db,
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
  deleteDoc,
  onSnapshot,
} from './config.js';

// Obtener todos los documentos de la coleccion 'post' usando onsnapshot
export const obtenerPosts = async (callback) => {
  const colRef = collection(db, 'posts');
  const q = query(colRef, orderBy('timestamp'));
  await onSnapshot(q, callback);
};

// Obtener data de todos los usuarios
export const obtenerUsuarios = async () => {
  const colRef = collection(db, 'usuarios');
  const querySnapshot = await getDocs(colRef).then((snapshot) => {
    const posts = [];
    snapshot.docs.forEach((docs) => {
      posts.push({ ...docs.data(), userId: docs.id });
    });
    return posts;
  });
  return querySnapshot;
};

// Obtener la data de cada usuaruo guardado en Firestore, lo buscamos por id
export const obtenerById = (idUser, nameColeccion) => {
  const docRef = doc(db, nameColeccion, idUser);
  const querySnapshot = getDoc(docRef).then((docs) => docs.data());
  return querySnapshot;
};

// Agregar data inicial al momento de registro a la coleccion usuarios
export const agregarDataUserFS = async (id, Username, Correo, Name, Descripcion, Ubicacion, srcImg, srcImgPortada) => {
  const colRefId = doc(db, 'usuarios', id);
  await setDoc(colRefId, {
    username: Name,
    correo: Correo,
    ubicacion: Ubicacion,
    name: Username,
    descripcion: Descripcion,
    imgUsuario: srcImg,
    imgPortada: srcImgPortada,
  });
};

// Subir data a la colección posts en firestore
export const subirDataHomeCol = (creadorPost, post, Categoria, urlImg) => {
  const colRefPost = collection(db, 'posts');
  const functionAdd = addDoc(colRefPost, {
    usuarioId: creadorPost,
    publicacion: post,
    categoria: Categoria,
    imgPost: urlImg,
    timestamp: serverTimestamp(),
    likes: [],
  });
  return functionAdd;
};

// Para actualizar arreglo de likes
export const subirLikes = async (idPost, dataLikes) => {
  const docId = doc(db, 'posts', idPost);
  await updateDoc(docId, {
    likes: dataLikes,
  });
};

/* -------------- Funcionalidad del perfil de usuario ------------------------*/
/* export const getCurrentUser = (userId) => {
  const colRefId = doc(db, 'usuarios', userId);
  return getDoc(colRefId);
}; */

// Para actualizar datos del perfil en la coleccion usuarios
export const actualizarPerfil = (userId, name, username, ubicacion, descripcion, imgUsuario, imgPortada) => {
  const colRefId = doc(db, 'usuarios', userId);
  return updateDoc(colRefId, {
    username,
    name,
    ubicacion,
    descripcion,
    imgUsuario,
    imgPortada,
  });
};

// Agregar  usuario a firestore desde boton de google
export const agregarGoogleUser = (id, user) => {
  const colRefId = doc(db, 'usuarios', id);
  return setDoc(colRefId, {
    username: user.displayName,
    correo: user.email,
    imgUsuario: 'imagenes/user-circle-fill.png',
    imgPortada: 'imagenes/ImgDelUsuario.png',
  });
};

// Agregar  usuario a firestore desde boton de facebook
export const agregarFacebookUser = (id, user) => {
  const colRefId = doc(db, 'usuarios', id);
  return setDoc(colRefId, {
    username: user.displayName,
    correo: user.email,
    imgUsuario: user.photoUrl,
    imgPortada: 'imagenes/ImgDelUsuario.png',
  });
};

// Buscar posts creados por el usuario logueado
export const obtenerUserPosts = async () => {
  const userId = JSON.parse(sessionStorage.userSession).id;
  const colRef = collection(db, 'posts');
  const q = query(colRef, orderBy('timestamp'));
  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((docs) => {
    posts.push({ ...docs.data(), id: docs.id });
  });
  const postFiltrado = posts.filter((e) => e.usuarioId === userId);
  return postFiltrado;
};

// Eliminar un post de con respecto al postId
export const eliminarPost = async (postId) => {
  await deleteDoc(doc(db, 'posts', postId));
};

// Editar un post en especifico
export const actualizarPost = (postId, publicacion) => {
  const colRefId = doc(db, 'posts', postId);
  return updateDoc(colRefId, {
    publicacion,
  });
};

// Obtener posts de la seccion grupos por categoria
export const obtenerPostsGrupo = async (grupo) => {
  const colRef = collection(db, 'posts');
  const q = query(colRef, orderBy('timestamp'));
  const querySnapshot = await getDocs(q).then((snapshot) => {
    const posts = [];
    snapshot.docs.forEach((docs) => {
      posts.push({ ...docs.data(), postId: docs.id });
    });
    const postFiltrado = posts.filter((e) => e.categoria === grupo);
    return postFiltrado;
  });
  return querySnapshot;
};
