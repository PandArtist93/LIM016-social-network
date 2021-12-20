import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  app,
} from './config.js';

const storage = getStorage(app);

export const subirFileStorage = async (file) => {
  const archivoRef = ref(storage, `imgPosts/${file.name}`);
  await uploadBytes(archivoRef, file);
  const traerFile = getDownloadURL(archivoRef);
  return traerFile;
};
