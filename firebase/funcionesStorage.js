import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  app,
} from './config.js';

//
const storage = getStorage(app);

export const subirFileStorage = async (file) => {
  const archivoRef = ref(storage, `imgUsuarios/${file.name}`);
  await uploadBytes(archivoRef, file);
  const traerFile = getDownloadURL(archivoRef);
  console.log(traerFile);
  return traerFile;
};
