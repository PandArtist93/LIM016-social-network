import { obtenerUserPosts, eliminarPost } from '../firebase/funcionesFirestore.js';
import { validateSessionStorage } from './validaciones.js';
/* export const contenidoPerfil = () => {
  const perfilSeccion = document.createElement('section');
  perfilSeccion.classList.add('cuerpoPerfil');
  const userData = JSON.parse(sessionStorage.userSession);
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
                    <h2>${userData.username}</h2>
                    <p>${userData.descripcion}</p>
                    <p>Soy de ${userData.ubicacion}</p>
                </div>

                <div class="botonesDelPerfil">
                    <button class="btnEditar"><a href='#/arteditarperfil'>Editar Perfil</a></button>
                    <button class="btnInicio"><a href="#/artmuro">Volver a Inicio</a></button>
                </div>
            </div>       
        </div>  
        <button class="btnEditar"><a href='#/arteditarperfil'>Editar Perfil</a></button>      

        <div class="seccPostUsuario" id="SeccPublicacionesUsuario">
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
        </div>`;
  return perfilSeccion;
};*/

const subirContainer = (idPost, creadorPost, apodoUser, postTxt, srcImagenPost) => {
    const divPost = document.createElement('div');
    divPost.classList.add('tableroPost');

    divPost.innerHTML = `
    <div class="usuarioPost" id="${idPost}">
        <div class="imgUsuarioPost"><img class="imgPost"src="imagenes/ImgUsuario3.png"></div>
        <div class="infoUsuarioPost">
            <div class="nombreUsuarioPost"><p>${creadorPost}</p><img src="imagenes/bxs-user-plus 2.png"></div>
            <div class="descripcionUsuarioPost"><p>${apodoUser}</p></div>            
        </div>
        <button class="btnDelete"><img src="imagenes/delete.png"></button>
    </div>
    <div class="estadoCompartido">
        <div class="contenidoCompartido">
            <p>${postTxt}</p>
            <img src="${srcImagenPost}">
        </div>
    </div>
    <div class="botonesReaccion">
        <img src="imagenes/heartIcono.png">
        <img src="imagenes/comentIcono.png">
        <img src="imagenes/compartirIcono.png">
    </div>
    `;
return divPost;
};

const rellenarPerfil = async (containerPost) => {
    const datosPost = await obtenerUserPosts();
    const userData = JSON.parse(sessionStorage.userSession);
    datosPost.forEach((post) => {
        containerPost.prepend(subirContainer(post.id, userData.username, userData.descripcion, post.publicacion, ''));
    });
    btnEliminarPost();;

};
  
export const contenidoPerfil = () => {
    const perfilSeccion = document.createElement('section');
    perfilSeccion.classList.add('cuerpoPerfil');

    const userData = validateSessionStorage();

    const navInferior = document.createElement('nav');
    navInferior.classList.add('barraNavegacionInferior');
    navInferior.innerHTML = `
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
    `;
    const tableroInformacionUsuario = document.createElement('div');    
    tableroInformacionUsuario.classList.add('fondo1');
    tableroInformacionUsuario.innerHTML = `
        <div class="fondoImagenPerfil">
            <img src="imagenes/ImgDelUsuario.png">
        </div>  
        <div class="fondo2">
            <div class="imgPerfilUsuario">
                <img src="imagenes/ImgUsuario.png">
            </div>
            
            <div class="contenidoTextPerfil">
                <h2>${userData.username}</h2>
                <p>(${userData.name})</p>
                <p>"${userData.descripcion}"</p>
                <p>${userData.ubicacion}</p>
            </div>

            <div class="botonesDelPerfil">
                <button class="btnEditar"><a href='#/arteditarperfil'>Editar Perfil</a></button>
                <button class="btnInicio"><a href="#/artmuro">Volver a Inicio</a></button>
            </div>
        </div>
    `;
    const btnEditarPerfilResponsive = document.createElement('button');    
    btnEditarPerfilResponsive.classList.add('btnEditar');
    btnEditarPerfilResponsive.innerHTML = `
        <a href='#/arteditarperfil'>Editar Perfil</a>
    `;
    const contenedorPublicacionesPerfil = document.createElement('div');
    contenedorPublicacionesPerfil.classList.add('seccPostUsuario');
    contenedorPublicacionesPerfil.setAttribute('id', 'SeccPublicacionesUsuario');
    //contenedorPublicacionesPerfil.prepend(subirContainer('Prueba', 'Amante De Los Animales', 'A veces me preguntan: ¿Por qué inviertes todo ese tiempo y dinero hablando de la amabilidad para con los animales, cuando existe tanta crueldad hacia el hombre?. A lo que yo respondo: Estoy trabajando en las raíces.', ''));
    rellenarPerfil(contenedorPublicacionesPerfil);
  
    perfilSeccion.appendChild(navInferior);
    perfilSeccion.appendChild(tableroInformacionUsuario);
    perfilSeccion.appendChild(btnEditarPerfilResponsive);
    perfilSeccion.appendChild(contenedorPublicacionesPerfil);
    return perfilSeccion;
};

export const btnEliminarPost = () => {
    const postsCards = document.getElementsByClassName("usuarioPost");
    //console.log(postsCards);
    Array.from(postsCards).forEach((postCard) => {
        const btnEliminar = postCard.querySelector(".btnDelete");       
        btnEliminar.addEventListener("click", async () => {
            const postEliminado = document.getElementById(postCard.id);
            await eliminarPost(postCard.id);  
            console.log("si elimino el post");          
            postEliminado.parentElement.remove();
          
        })
        
    })
   
};