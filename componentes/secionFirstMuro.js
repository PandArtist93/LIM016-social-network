export const seccionMuro1 = () => {
  const primeraSeccion = document.createElement('section');
  primeraSeccion.classList.add('item2');
  primeraSeccion.innerHTML = `
        <section class="secUsuario">
            <div class="contenedorPortada">
                <img src="imagenes/ImgDelUsuario.png">
            </div>  
            <div class="contenedorPerfil">
                <img src="imagenes/ImgUsuario.png">
                <div class="datosUsuario">
                    <h2 class="nombreUsuario">Lucía Lopez</h2>
                    <p class="estadoUsuario">Amante de los animales</p>
                </div>
            </div>
        </section>         
        <section class="secCategorias">
            <h1>Grupos</h1>            
            <div class= "contenedorCategorias">         
                <a class="categoriaUnica">
                    <img src="imagenes/iconoRefugioMascotas.png" >
                    <p>Refugio</p>
                <a>
                <a class="categoriaUnica">
                    <img src="imagenes/reportarIcono.png" >
                    <p>Mascotas perdidas</p>
                </a>
                <a class="categoriaUnica">
                    <img src="imagenes/adoptarIcono.png" >
                    <p>Adoptar</p>
                </a>
                <a class="categoriaUnica">
                    <img src="imagenes/localizacionIcono.png" >
                    <p>Localización</p>
                </a>
                <a class="categoriaUnica">
                    <img src="imagenes/medicinasIcono.png" >
                    <p>Donaciones</p>
                </a>           
            </div> 
        </section>       
    `;
  return primeraSeccion;
};
