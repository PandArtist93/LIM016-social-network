import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from './config.js';

// Se encarga de subir file a storage y te retorna el url la imagen
export const subirFileStorage = async (file, carpeta) => {
  const archivoRef = ref(storage, `${carpeta}/${file.name}`);
  await uploadBytes(archivoRef, file);
  const traerFile = getDownloadURL(archivoRef);
  return traerFile;
};
