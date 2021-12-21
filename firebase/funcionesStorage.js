import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  app,
} from './config.js';

// inicializa el storage
export const storage = getStorage(app);

// Se encarga de subir file a storage y te retorna el url la imagen
export const subirFileStorage = async (file, carpeta) => {
  const archivoRef = ref(storage, `${carpeta}/${file.name}`);
  await uploadBytes(archivoRef, file);
  const traerFile = getDownloadURL(archivoRef);
  return traerFile;
};
