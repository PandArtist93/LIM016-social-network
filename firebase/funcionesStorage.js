import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  app,
} from './config.js';

export const storage = getStorage(app);

export const subirFileStorage = async (file, carpeta) => {
  const archivoRef = ref(storage, `${carpeta}/${file.name}`);
  await uploadBytes(archivoRef, file);
  const traerFile = getDownloadURL(archivoRef);
  return traerFile;
};

/* export const subirImgStorage = async (file) => {
  const storageRef = ref(storage, `imgUsuarios/${file.name}`);
  await uploadBytes(storageRef, file);
  const urlDescarga = await getDownloadURL(storageRef);
  return urlDescarga;
}; */
