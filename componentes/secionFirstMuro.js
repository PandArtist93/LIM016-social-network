import { validateSessionStorage } from './validaciones.js';

export const seccionMuro1 = () => {
  const primeraSeccion = document.createElement('section');
  primeraSeccion.classList.add('item2');

  const userData = validateSessionStorage();
  // const userData = JSON.parse(sessionStorage.userSession);
  primeraSeccion.innerHTML = `
        <section class="secUsuario">
            <div class="contenedorPortada">
                <img src="imagenes/ImgDelUsuario.png">
            </div>  
            <div class="contenedorPerfil">
                <img src="imagenes/ImgUsuario.png">
                <div class="datosUsuario">
                    <h2 class="nombreUsuario">${userData.username}</h2>
                    <p class="correoUsuario">${userData.correo}</p>
                    <p class="estadoUsuario">${userData.descripcion}</p>
                </div>
            </div>
        </section>         
        <section class="secCategorias">
            <h1>Grupos</h1>            
            <div class= "contenedorCategorias">         
                <a href="#/artrefugio" class="categoriaUnica">
                    <img src="imagenes/iconoRefugioMascotas.png" >
                    <p>Refugios</p>
                <a>
                <a href="#/artmascotasperdidas" class="categoriaUnica">
                    <img src="imagenes/reportarIcono.png" >
                    <p>Mascotas Perdidas</p>
                </a>
                <a href="#/artadoptar" class="categoriaUnica">
                    <img src="imagenes/adoptarIcono.png" >
                    <p>Adoptar</p>
                </a>
                <a href="#/artlugares" class="categoriaUnica">
                    <img src="imagenes/localizacionIcono.png" >
                    <p>Lugares</p>
                </a>
                <a href="#/artdonaciones" class="categoriaUnica">
                    <img src="imagenes/medicinasIcono.png" >
                    <p>Donaciones</p>
                </a>           
            </div> 
        </section>       
    `;
  return primeraSeccion;
};
