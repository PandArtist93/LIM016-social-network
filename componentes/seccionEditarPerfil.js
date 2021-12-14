import { actualizarPerfil } from '../firebase/funcionesFirestore.js';

export const contenidoEditarPerfil = () => {
    const EditarSeccion = document.createElement('section');
    EditarSeccion.classList.add('cuerpoEditarPerfil');
    EditarSeccion.innerHTML = `        
        <nav class= "barraNavegacionInferior">         
            <ul>
                <li class="list">
                    <a>
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
                                <h2 id="nombreDelPerfil"></h2>
                                <p id="descripcionDelPerfil"></p>
                                <p id="ubicacionDelPerfil"></p>
                            </div>
                        </div>
                    </div>

                    <div class="modalFormulario" id="modalFormulario">
                        <form id="formIngreso">
                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion" id="">Nombre de Usuario:</p>
                                <input type="text" id="actualizacionNombre" class="datosParaActualizar">
                            </div>
                            
                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion" id="">Cambiar estado:</p>
                                <input type="text" id="actualizacionEstado" class="datosParaActualizar">
                            </div>

                            <div class="cajaImputDatos">
                                <p class="textSeccActualizacion">Ubicación:</p>
                                <input type="text" id="actualizacionUbicacion" class="datosParaActualizar">
                            </div>   
                            <div class="botonesFormularios">
                                <button type="submit" id="guardarCambios" class="guardarCambios">Guardar Cambios</button>  
                                <button class="btnInicio"><a href="#/artmuro">Volver a Inicio</a></button> 
                            </div>              
                                                        
                        </form> 
                    </div>          
                </div> 
            </div>
        </div>`
    ;
    return EditarSeccion;
};

export const btnEditarPerfil = () => {
    const btnGuardarCambios = document.getElementById("guardarCambios"); 
    btnGuardarCambios.addEventListener("click", (e) =>{
        e.preventDefault();
        const inputNombreActualizado = document.getElementById("actualizacionNombre").value;
        const inputDescripcionActualizado = document.getElementById("actualizacionEstado").value;
        const inputUbicacionActualizado = document.getElementById("actualizacionUbicacion").value;
        const userData = JSON.parse(sessionStorage.userSession);
        actualizarPerfil(userData.id, inputNombreActualizado, inputUbicacionActualizado, inputDescripcionActualizado);
    });
    
};

export const actualizarDatosPerfil = (name, ubicacion, descripcion) => {
    const nombreDelPerfil = document.getElementById("nombreDelPerfil"); 
    const ubicacionDelPerfil = document.getElementById("ubicacionDelPerfil"); 
    const descripcionDelPerfil = document.getElementById("descripcionDelPerfil"); 
    nombreDelPerfil.innerHTML = name;
    ubicacionDelPerfil.innerHTML = ubicacion;
    descripcionDelPerfil.innerHTML = descripcion;
} 

