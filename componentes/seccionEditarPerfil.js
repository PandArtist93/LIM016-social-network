/* eslint-disable max-len */
import { actualizarPerfil } from '../firebase/funcionesFirestore.js';
import { validateSessionStorage } from './validaciones.js';
import { subirFileStorage } from '../firebase/funcionesStorage.js';

// Render de la seccion contenido editar perfil
export const contenidoEditarPerfil = () => {
  const EditarSeccion = document.createElement('section');
  EditarSeccion.classList.add('cuerpoEditarPerfil');
  const userData = validateSessionStorage();
  EditarSeccion.innerHTML = `
        <nav class= "barraNavegacionInferior">
            <ul>
                <li class="list">
                    <a class="abrirModal">
                        <span class="icon">
                            <img src="imagenes/users-three.png">
                        </span>
                    </a>
                </li>
                <li class="list">
                    <a href="#/artmuro">
                        <span class="icon">
                            <img src="imagenes/house-fill.png">
                        </span>
                    </a>
                </li>
                <li class="list">
                    <a href="#/artperfil">
                        <span class="icon">
                            <img src="${userData.imgUsuario}">
                        </span>
                    </a>
                </li>
            </ul>
        </nav>

        <div class= "fondoModal" id="fondoModal">
            <div class="modal-perfil-container" id="modalPerfilCont">
                <p class="close" id="close"></p>
                <div class="modalContent modalClose" id="modal">
                    <div class="cajaSuperior">
                        <div class="fondoImagenSecPerfil">
                            <img id="imgPortadaUsuario"src="${userData.imgPortada}">
                        </div>
                        <div class="infActualDelUsuario" id="infActualDelUsuario">
                            <div class="imgPerfilUsuario">
                                <img id="imgUsuario" src="${userData.imgUsuario}">
                            </div>

                            <div class="contenidoTextPerfil">
                                <h2 id="nombreDelUsuario">${userData.name}</h2>
                                <p id="nombreDelPerfil">${userData.username}</p>
                                <p id="descripcionDelPerfil">${userData.descripcion}</p>
                                <p id="ubicacionDelPerfil">${userData.ubicacion}</p>
                            </div>
                        </div>
                    </div>

                    <div class="modalFormulario" id="modalFormulario">
                        <form id="formIngreso">

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion">Foto de perfil:</p>
                                <input type="file" id="selbtn" class="datosParaActualizar"></input>
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion">Foto de portada:</p>
                                <input type="file" id="ImgPortadaUpdate" class="datosParaActualizar"></input>
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion" id="">Usuario:</p>
                                <input type="text" id="actualizacionUsuario" class="datosParaActualizar" autocapitalize="sentence" value="${userData.username}">
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion" id="">Nombre:</p>
                                <input type="text" id="actualizacionNombre" class="datosParaActualizar" autocapitalize="sentence" value="${userData.name}">
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion" id="">Estado:</p>
                                <input type="text" id="actualizacionEstado" class="datosParaActualizar" autocapitalize="sentence" value="${userData.descripcion}">
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion">Ubicación:</p>
                                <input type="text" id="actualizacionUbicacion" class="datosParaActualizar" autocapitalize="sentence" value="${userData.ubicacion}">
                            </div>
                            <div class="botonesFormularios">
                                <button type="submit" id="guardarCambios" class="guardarCambios">Guardar Cambios</button>  
                                <button class="btnInicio"><a href="#/artmuro">Volver a Inicio</a></button> 
                            </div>
                        </form>
                    </div>
            
                </div>
            </div>
        </div>
    `;
  return EditarSeccion;
};

// Funcionalidad para sustituir datos de la seccion de perfil
export const actualizarDatosPerfil = (username, name, ubicacion, descripcion, imgusuario, imgportada) => {
  const nombreDelUsuario = document.getElementById('nombreDelUsuario');
  const nombreDelPerfil = document.getElementById('nombreDelPerfil');
  const ubicacionDelPerfil = document.getElementById('ubicacionDelPerfil');
  const descripcionDelPerfil = document.getElementById('descripcionDelPerfil');
  const imgUsuario = document.getElementById('imgUsuario');
  const imgPortada = document.getElementById('imgPortadaUsuario');
  nombreDelUsuario.innerHTML = username;
  nombreDelPerfil.innerHTML = name;
  ubicacionDelPerfil.innerHTML = ubicacion;
  descripcionDelPerfil.innerHTML = descripcion;
  imgUsuario.src = imgusuario;
  imgPortada.src = imgportada;
};

// Funcionalidad del boton Editar Perfil
export const btnEditarPerfil = () => {
  const btnGuardarCambios = document.getElementById('guardarCambios');
  const btnArchivoLocal = document.getElementById('selbtn');
  const btnArchivoLocalPortada = document.getElementById('ImgPortadaUpdate');
  const archivoImgUsuario = [];
  const archivoImgPortada = [];
  btnArchivoLocal.addEventListener('change', (e) => {
    archivoImgUsuario.push(e.target.files[0]);
  });
  btnArchivoLocalPortada.addEventListener('change', (e) => {
    archivoImgPortada.push(e.target.files[0]);
  });
  btnGuardarCambios.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputusuarioActualizado = document.getElementById('actualizacionUsuario').value;
    const inputNombreActualizado = document.getElementById('actualizacionNombre').value;
    const inputDescripcionActualizado = document.getElementById('actualizacionEstado').value;
    const inputUbicacionActualizado = document.getElementById('actualizacionUbicacion').value;
    const userData = JSON.parse(sessionStorage.userSession);
    const urlImagen = await subirFileStorage(archivoImgUsuario[archivoImgUsuario.length - 1], 'imgUsuarios');
    const urlPortada = await subirFileStorage(archivoImgPortada[archivoImgPortada.length - 1], 'imgPortada');
    actualizarPerfil(
      userData.id,
      inputNombreActualizado,
      inputusuarioActualizado,
      inputUbicacionActualizado,
      inputDescripcionActualizado,
      urlImagen,
      urlPortada,
    )
      .then(() => {
        // obteniendo los datos para actualizar en el sessionStorage y metodo actualizarDatosPerfil
        userData.username = inputusuarioActualizado;
        userData.name = inputNombreActualizado;
        userData.ubicacion = inputUbicacionActualizado;
        userData.descripcion = inputDescripcionActualizado;
        userData.imgUsuario = urlImagen;
        userData.imgPortada = urlPortada;
        sessionStorage.setItem('userSession', JSON.stringify(userData));
        actualizarDatosPerfil(
          inputusuarioActualizado,
          inputNombreActualizado,
          inputUbicacionActualizado,
          inputDescripcionActualizado,
          urlImagen,
          urlPortada,
        );
      });
  });
};
