import { actualizarPerfil } from '../firebase/funcionesFirestore.js';
import { validateSessionStorage } from './validaciones.js';

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
                            <img src="imagenes/ImgUsuario.png">
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
                            <img src="imagenes/ImgDelUsuario.png">
                        </div>
                        <div class="infActualDelUsuario" id="infActualDelUsuario">
                            <div class="imgPerfilUsuario">
                            <img src="imagenes/ImgUsuario.png">
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
                                <p class="textSeccActualizacion" id="">Usuario:</p>
                                <input type="text" id="actualizacionUsuario" class="datosParaActualizar" autocapitalize="sentence">
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion" id="">Nombre:</p>
                                <input type="text" id="actualizacionNombre" class="datosParaActualizar" autocapitalize="sentence">
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion" id="">Estado:</p>
                                <input type="text" id="actualizacionEstado" class="datosParaActualizar" autocapitalize="sentence">
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion">Ubicación:</p>
                                <input type="text" id="actualizacionUbicacion" class="datosParaActualizar" autocapitalize="sentence">
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

export const actualizarDatosPerfil = (username, name, ubicacion, descripcion) => {
  const nombreDelUsuario = document.getElementById('nombreDelUsuario');
  const nombreDelPerfil = document.getElementById('nombreDelPerfil');
  const ubicacionDelPerfil = document.getElementById('ubicacionDelPerfil');
  const descripcionDelPerfil = document.getElementById('descripcionDelPerfil');
  nombreDelUsuario.innerHTML = username;
  nombreDelPerfil.innerHTML = name;
  ubicacionDelPerfil.innerHTML = ubicacion;
  descripcionDelPerfil.innerHTML = descripcion;
};

export const btnEditarPerfil = () => {
  const btnGuardarCambios = document.getElementById('guardarCambios');
  btnGuardarCambios.addEventListener('click', (e) => {
    e.preventDefault();
    const inputusuarioActualizado = document.getElementById('actualizacionUsuario').value;
    const inputNombreActualizado = document.getElementById('actualizacionNombre').value;
    const inputDescripcionActualizado = document.getElementById('actualizacionEstado').value;
    const inputUbicacionActualizado = document.getElementById('actualizacionUbicacion').value;
    const userData = JSON.parse(sessionStorage.userSession);
    actualizarPerfil(
      userData.id,
      inputNombreActualizado,
      inputusuarioActualizado,
      inputUbicacionActualizado,
      inputDescripcionActualizado,
    )
      .then(() => {
        userData.username = inputusuarioActualizado;
        userData.name = inputNombreActualizado;
        userData.ubicacion = inputUbicacionActualizado;
        userData.descripcion = inputDescripcionActualizado;
        sessionStorage.setItem('userSession', JSON.stringify(userData));
        actualizarDatosPerfil(
          inputusuarioActualizado,
          inputNombreActualizado,
          inputUbicacionActualizado,
          inputDescripcionActualizado,
        );
      });
  });
};

