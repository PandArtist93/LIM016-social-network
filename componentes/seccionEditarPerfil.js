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
                            <img src="imagenes/imgUsuario.png">
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
                            <img src="imagenes/imgDelUsuario.png">
                        </div>  
                        <div class="infActualDelUsuario" id="infActualDelUsuario">
                            <div class="imgPerfilUsuario">
                                <img src="imagenes/imgUsuario.png">
                            </div>
                    
                            <div class="contenidoTextPerfil">
                                <h2>Lucía Lopez</h2>
                                <p>Amante de los animales</p>
                                <p>Lima -Perú</p>
                            </div>
                        </div>
                    </div>

                    <div class="modalFormulario" id="mmodalFormulario">
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
        const userData = JSON.parse(sessionStorage.userSession);
        actualizarPerfil(userData.id);

    });
    
};