export const seccionMuro2 = () => {
  const segundaSeccion = document.createElement('section');
  segundaSeccion.classList.add('item3');
  segundaSeccion.innerHTML = `
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
                    <option value="value6">Ninguna</option>
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
                      <div class="botonPuntosHorizontales"><img src="imagenes/bx-borra-editar.png"></div>     
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
                      <div class="botonPuntosHorizontales"><img src="imagenes/bx-borra-editar.png"></div>     
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
