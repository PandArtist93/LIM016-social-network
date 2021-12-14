export const contenidoPerfil = () => {
    const perfilSeccion = document.createElement('section');
    perfilSeccion.classList.add('cuerpoPerfil');
    perfilSeccion.innerHTML = `        
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
                    <a>
                        <span class="icon">
                            <img src="imagenes/ImgUsuario.png">
                        </span>                        
                    </a>
                </li>
            </ul>              
        </nav> 
    
        <div class="fondo1">
            <div class="fondoImagenPerfil">
                <img src="imagenes/ImgDelUsuario.png">
            </div>  
            <div class="fondo2">
                <div class="imgPerfilUsuario">
                    <img src="imagenes/ImgUsuario.png">
                </div>
                
                <div class="contenidoTextPerfil">
                    <h2>Lucía Lopez</h2>
                    <p>Amante de los animales</p>
                    <p>Lima -Perú</p>
                </div>

                <div class="botonesDelPerfil">
                    <button class="botonAgregar"><img src="imagenes/pencil.png"><a href='#/arteditarperfil'>Editar Perfil</a></button>
                    <button class="btnInicio"><a href="#/artmuro">Volver a Inicio</a></button>
                </div>
            </div>        
        </div>       

        <div class="seccPostUsuario">
            <div class="tableroPost">            
                <div class="usuarioPost">
                    <div class="imgUsuarioPost">
                        <img class="imgPost"src="imagenes/ImgUsuario.png">
                    </div>
                    <div class="infoUsuarioPost">
                        <div class="nombreUsuarioPost"><p>Lucía Lopez</p><img src="imagenes/bxs-user-plus 2.png"></div>
                        <div class="descripcionUsuarioPost"><p>Amante de los animales</p></div>                                  
                    </div>
                    <div class="puntosHorizontales">
                        <figure class="puntos"></figure>
                        <figure class="puntos middle2"></figure>
                        <figure class="puntos"></figure>
                        <ul class="desplegable2" id="menuListaPost">
                            <li><a><img src="imagenes/edit.png"><span>Editar</span></a></li>
                            <li><a><img src="imagenes/delete.png"><span>Eliminar</span></a></li>
                        </ul>
                    </div>    
                </div>                

                <div class="estadoCompartido">
                    <div class="contenidoCompartido">
                        <p></p>
                        <img src="imagenes/gatitoFoto.png">
                    </div>
                </div>  

                <div class="botonesReaccion">
                    <img src="imagenes/heartIcono.png">
                    <img src="imagenes/comentIcono.png">
                    <img src="imagenes/compartirIcono.png">
                </div>
            </div>

            <div class="tableroPost">            
                <div class="usuarioPost">
                    <div class="imgUsuarioPost">
                        <img class="imgPost"src="imagenes/ImgUsuario.png">
                    </div>
                    <div class="infoUsuarioPost">
                        <div class="nombreUsuarioPost"><p>Lucía Lopez</p><img src="imagenes/bxs-user-plus 2.png"></div>
                        <div class="descripcionUsuarioPost"><p>Amante de los animales</p></div>                                  
                    </div>
                    <div class="puntosHorizontales">
                        <figure class="puntos"></figure>
                        <figure class="puntos middle2"></figure>
                        <figure class="puntos"></figure>
                        <ul class="desplegable2" >
                            <li><a><img src="imagenes/edit.png"><span>Editar</span></a></li>
                            <li><a><img src="imagenes/delete.png"><span>Eliminar</span></a></li>
                        </ul>
                    </div>    
                </div>                

                <div class="estadoCompartido">
                    <div class="contenidoCompartido">
                        <p>A veces me preguntan: ¿Por qué inviertes todo ese tiempo y dinero hablando de la amabilidad
                         para con los animales, cuando existe tanta crueldad hacia el hombre?. A lo que yo respondo: 
                         Estoy trabajando en las raíces.</p>
                        <img src="">
                    </div>
                </div>  

                <div class="botonesReaccion">
                    <img src="imagenes/heartIcono.png">
                    <img src="imagenes/comentIcono.png">
                    <img src="imagenes/compartirIcono.png">
                </div>
            </div>
        </div>`
    ;
    return perfilSeccion;
};

