export const seccionMuro1 = () => {
  const primeraSeccion = document.createElement('section');
  primeraSeccion.classList.add('item2');
  primeraSeccion.innerHTML = `
        <section class="secUsuario">
            <div class="contenedorPortada">
                <img src="imagenes/ImgDelUsuario.png">
            </div>  
            <div class="contenedorPerfil">
                <div class="ImgCentralUsuario">
                    <img src="imagenes/ImgUsuario.png">
                </div>
                <div class="datosUsuario">
                    <h2 class="nombreUsuario">Lucía Lopez</h2>
                    <p class="estadoUsuario">Amante de los animales</p>
                    <button class="botonAgregar"><img src="imagenes/pencil.png">Editar Prefil</button>
                </div>
            </div>
        </section>         
        <section class="secCategorias">
            <h1>Explorar</h1>            
            <div>         
                <div class="categoriaUnica">
                    <img src="imagenes/refugioIcono.png" >
                    <p>Refugio</p>
                </div>
                <div class="categoriaUnica">
                    <img src="imagenes/reportarIcono.png" >
                    <p>Mascotas perdidas</p>
                </div>
                <div class="categoriaUnica">
                    <img src="imagenes/adoptarIcono.png" >
                    <p>Adoptar</p>
                </div>
                <div class="categoriaUnica">
                    <img src="imagenes/localizacionIcono.png" >
                    <p>Localización</p>
                </div>
                <div class="categoriaUnica">
                    <img src="imagenes/medicinasIcono.png" >
                    <p>Medicinas</p>
                </div>           
            </div> 
        </section>
    `;
  return primeraSeccion;
};
