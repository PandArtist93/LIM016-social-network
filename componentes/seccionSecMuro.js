export const seccionMuro2 = () => {
  const segundaSeccion = document.createElement('section');
  segundaSeccion.classList.add('item3');
  segundaSeccion.innerHTML = `
        <div class="tableroCompartir">
            <input type="text" placeholder="¿Qué quieres reportar?">
            <div class="botones">
                <button class="botonCompartirImagen"><img src="imagenes/botonCompartirImagen.png"></button>    
                <button class="botonCompartir">Compartir</button>                            
            </div>                  
        </div>
        
        <div class="tableroPost">
            <div class="usuarioPost">
                <div class="imgUsuarioPost"><img class="imgPost"src="imagenes/ImgUsuario2.png"></div>
                <div class="infoUsuarioPost">
                    <div class="nombreUsuarioPost"><p>Julio Perez</p></div>
                    <div class="descripcionUsuarioPost"><p>Voluntario en WUF</p></div>
                </div>
                <div class=""></div>
            </div>
            <div class="estadoCompartido">
                <p>Adoptar una mascota es cambiar dos vidas: la de la mascota que al fin olvidará sus duros días sin familia y la de quien se convertirá en su dueño y tendrá días cargados de amor. Si te interesa acoger a un nuevo miembro en tu hogar, estas son algunas de las muchas opciones que encuentras para adoptar animales en Lima.</p>
            </div>  
            <div class="botonesReaccion">
                <img src="imagenes/heartIcono.png">
                <img src="imagenes/comentIcono.png">
                <img src="imagenes/compartirIcono.png">
            </div>
        </div>
   `;
  return segundaSeccion;
};
