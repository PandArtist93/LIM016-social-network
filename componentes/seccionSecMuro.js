export const seccionMuro2 = () => {
  const segundaSeccion = document.createElement('section');
  segundaSeccion.classList.add('item3');
  segundaSeccion.innerHTML = `
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
                    <a>
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

        <div class="tableroCompartir">
            <input type="text" placeholder="¿Qué quieres reportar?">
            <div class="botones">
                <button class="botonCompartirImagen"><img src="imagenes/botonCompartirImagen.png"></button>  
                <select name="Grupo" id="Grupo" class="Grupo">
                <option value="value1">Refugios</option>
                <option value="value2" selected>Reportar perdidos</option>
                <option value="value3">Adoptar</option>
                <option value="value4">Lugares</option>
                <option value="value5">Donaciones</option>
                <option value="value6">Principal</option>
                </select>  
                <button class="botonCompartir">Compartir</button>                            
            </div>                  
        </div>

        <div class="container-post" id="container-post">
            <div class="tableroPost">
                <div class="usuarioPost">
                    <div class="imgUsuarioPost"><img class="imgPost"src="imagenes/ImgUsuario3.png"></div>
                    <div class="infoUsuarioPost">
                        <div class="nombreUsuarioPost"><p>María Casas</p><img src="imagenes/bxs-user-plus 2.png"></div>
                        <div class="descripcionUsuarioPost"><p>catlover</p></div>                                  
                    </div>
                    <div class="puntosHorizontales">
                        <figure class="puntos"></figure>
                        <figure class="puntos middle2"></figure>
                        <figure class="puntos"></figure>
                        <ul class="desplegable2" id="menuListaPost">
                            <li><a id="editar"><img src="imagenes/edit.png"><span>Editar</span></a></li>
                            <li><a id="eliminar"><img src="imagenes/delete.png"><span>Eliminar</span></a></li>
                        </ul>
                    </div>    
                </div>
                <div class="estadoCompartido">
                    <div class="contenidoCompartido">
                        <p></p>
                        <img src="imagenes/perritoFoto.png">
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
                    <div class="imgUsuarioPost"><img class="imgPost"src="imagenes/ImgUsuario2.png"></div>
                    <div class="infoUsuarioPost">
                        <div class="nombreUsuarioPost"><p>Julio Perez</p><img src="imagenes/bxs-user-plus 2.png"></div>
                        <div class="descripcionUsuarioPost"><p>Voluntario en WUF</p></div>                                  
                    </div>
                    <div class="puntosHorizontales">
                        <figure class="puntos"></figure>
                        <figure class="puntos middle2"></figure>
                        <figure class="puntos"></figure>
                        <ul class="desplegable2" id="menuListaPost">
                            <li><a id="editar"><img src="imagenes/edit.png"><span>Editar</span></a></li>
                            <li><a id="eliminar"><img src="imagenes/delete.png"><span>Eliminar</span></a></li>
                        </ul>
                    </div>      
                </div>
                <div class="estadoCompartido">
                    <p class="contenidoCompartido">Adoptar una mascota es cambiar dos vidas: la de la mascota que al fin olvidará sus duros días 
                    sin familia y la de quien se convertirá en su dueño y tendrá días cargados de amor. Si te interesa
                    acoger a un nuevo miembro en tu hogar, estas son algunas de las muchas opciones que encuentras 
                    para adoptar animales en Lima.</p>
                    <img src="">
                </div>  
                <div class="botonesReaccion">
                    <img src="imagenes/heartIcono.png">
                    <img src="imagenes/comentIcono.png">
                    <img src="imagenes/compartirIcono.png">
                </div>
            </div>            
        </div>  
    `;
  return segundaSeccion;
};

export const menuPuntosHorizontales = () => {
  const puntosHorizontales = document.querySelector('.puntosHorizontales');
  console.log(puntosHorizontales);
  const middle2 = document.querySelector('.middle2'); 
  const desplegable2 = document.querySelector('.desplegable2');
  
    puntosHorizontales.addEventListener('click', () => {
        middle2.classList.toggle('active');        
        desplegable2.classList.toggle('active');
        
    });
};
