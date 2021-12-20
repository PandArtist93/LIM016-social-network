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
  deleteDoc,
  onSnapshot,
  app,
} from './config.js';

// inicializa el firestore
const db = getFirestore(app);

// Obtener todos los documentos de la coleccion 'post' usando onsnapshot
export const obtenerPosts = async (callback) => {
  const colRef = collection(db, 'posts');
  const q = query(colRef, orderBy('timestamp'));
  await onSnapshot(q, callback);
};

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

// Obtener la data de cada usuarui guardado en Firestore, lo buscamos por id
export const obtenerById = async (idUser, nameColeccion) => {
  const docRef = doc(db, nameColeccion, idUser);
  const querySnapshot = await getDoc(docRef).then((docs) => docs.data());
  return querySnapshot;
};

// Agregar data inicial al momento de registro a la coleccion usuarios
export const agregarDataUserFS = async (id, Username, Correo, Name, Descripcion, Ubicacion) => {
  const colRefId = doc(db, 'usuarios', id);
  await setDoc(colRefId, {
    username: Name,
    correo: Correo,
    ubicacion: Ubicacion,
    name: Username,
    descripcion: Descripcion,
  });
};

export const subirDataHomeCol = async (creadorPost, post, Categoria, urlImg) => {
  const colRefPost = collection(db, 'posts');
  const functionAdd = await addDoc(colRefPost, {
    usuarioId: creadorPost,
    publicacion: post,
    categoria: Categoria,
    imgPost: urlImg,
    timestamp: serverTimestamp(),
    likes: [],
  });
  return functionAdd;
};

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

export const actualizarPerfil = (userId, name, username, ubicacion, descripcion) => {
  const colRefId = doc(db, 'usuarios', userId);
  return updateDoc(colRefId, {
    username,
    name,
    ubicacion,
    descripcion,
  });
};
/* ---------------  Agregar  usuario a firestore desde boton de google -----------------------*/
export const agregarGoogleUser = (id, user) => {
  const colRefId = doc(db, 'usuarios', id);
  return setDoc(colRefId, {
    username: user.displayName,
    correo: user.email,
  });
};
/* ---------------- Buscar posts creados por el usuario logueado--------------------------- */
export const obtenerUserPosts = async () => {
  const userId = JSON.parse(sessionStorage.userSession).id;
  const colRef = collection(db, 'posts');
  const q = query(colRef, where('usuarioId', '==', userId));
  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((docs) => {
    posts.push({ ...docs.data(), id: docs.id });
  });
  return posts;
};
/* ---------------- Eliminar un post de con respecto al postId-------------------------- */
export const eliminarPost = async (postId) => {
  await deleteDoc(doc(db, 'posts', postId));
};

/* ---------------- Editar un post en especifico ----------------------------------- */
export const actualizarPost = (postId, publicacion) => {
  const colRefId = doc(db, 'posts', postId);
  return updateDoc(colRefId, {
    publicacion,
  });
};
/* ---------------- Obtener posts de la seccion grupos por categoria--------------------------- */
export const obtenerPostsGrupo = async (grupoCategoria) => {
  const colRef = collection(db, 'posts');
  const q = query(colRef, where('categoria', '==', grupoCategoria));
  const querySnapshot = await getDocs(q).then((snapshot) => {
    const posts = [];
    snapshot.docs.forEach((docs) => {
      posts.push({ ...docs.data(), postId: docs.id });
    });
    return posts;
  });
  return querySnapshot;
};
