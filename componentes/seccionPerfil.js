import { obtenerUserPosts, eliminarPost, actualizarPost } from '../firebase/funcionesFirestore.js';
import { validateSessionStorage } from './validaciones.js';

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
        <button class="btnEdit"><img src="imagenes/edit.png"></button>
        <button class="btnDelete"><img src="imagenes/delete.png"></button>       
    </div>
    <div class="estadoCompartido">
        <div class="contenidoCompartido">
            <p class="postcontent">${postTxt}</p>
        </div>
        <div>
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

export const btnEliminarPost = () => {
    const postsCards = document.getElementsByClassName("usuarioPost");
    Array.from(postsCards).forEach((postCard) => {
        const btnEliminar = postCard.querySelector(".btnDelete");       
        btnEliminar.addEventListener("click", async () => {
            const confirmarcion = window.confirm("¿Esta seguro que quiere eliminar el post?");
            if (!confirmarcion) {
                return
            }
            const postEliminado = document.getElementById(postCard.id);
            await eliminarPost(postCard.id);  
            console.log("si elimino el post");          
            postEliminado.parentElement.remove(); 

        });        
    });   
};

const rellenarPerfil = async (containerPost) => {
  const datosPost = await obtenerUserPosts();
  const userData = JSON.parse(sessionStorage.userSession);
  datosPost.forEach((post) => {
    containerPost.prepend(subirContainer(post.id, userData.username, userData.descripcion, post.publicacion, ''));
  });
    btnEliminarPost();
    btnEditarPost();
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
          <a class="abrirModal">
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
                <p>${userData.name}</p>
                <p>${userData.descripcion}</p>
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

export const btnEditarPost = () => {
    const postsCards = document.getElementsByClassName("tableroPost");
    Array.from(postsCards).forEach((postCard) => {
        const btnPencil = postCard.querySelector(".btnEdit");       
        btnPencil.addEventListener("click", async () => {
            editarPost(postCard);
        });
    });
}

const editarPost = (postCard) => {
    
    const formularioEditar = document.createElement('form');
    formularioEditar.classList.add('editForm');
    formularioEditar.innerHTML = `
        <textarea id="inputEditar" name="inputEditar" rows="5" cols="33"></textarea>    
        <div class="">
            <button class="botonGuardarCambios">Guardar</button>
            <button class="botonCancelarCambios">Cancelar</button>  
        </div>     
    `;  
    const botonGuardarCambios = formularioEditar.querySelector(".botonGuardarCambios");
    const botonCancelarCambios = formularioEditar.querySelector(".botonCancelarCambios");
    const estadoCompartido = postCard.querySelector(".estadoCompartido");

    const contenidoCompartido = estadoCompartido.firstElementChild;
    formularioEditar.firstElementChild.value = contenidoCompartido.firstElementChild.textContent;
    
    // borramos el texto y agregamos el formulario de edicion
    estadoCompartido.innerHTML = "";
    estadoCompartido.appendChild(formularioEditar);

    botonCancelarCambios.addEventListener('click', (e) => {
        e.preventDefault();
        estadoCompartido.innerHTML = "";
        estadoCompartido.appendChild(contenidoCompartido);
    });

    botonGuardarCambios.addEventListener('click', (e) => {
        e.preventDefault();
        const postId = postCard.firstElementChild.id;
        const form = e.target.parentElement.parentElement;
        const changedText = form.firstElementChild.value;
        actualizarPost(postId, changedText)
            .then(() => {
                console.log("sabemos si funciono");
                contenidoCompartido.firstElementChild.textContent = changedText;
                estadoCompartido.innerHTML = ""
                estadoCompartido.appendChild(contenidoCompartido);
            });
    });
}

