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
                <div class="infoUsuarioPost">
                    
                </div>
                <img>
            </div>
            <div class="estadoCompartido"></div>  
            <div class="botonesReaccion">
                <img src="imagenes/heartIcono.png">
                <img src="imagenes/comentIcono.png">
                <img src="imagenes/compartirIcono.png">
                <img src="imagenes/emojiIcono.png">
            </div>
        </div>
   `;
  return segundaSeccion;
};
