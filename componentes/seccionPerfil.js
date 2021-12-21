import {
  obtenerUserPosts, eliminarPost, actualizarPost, obtenerUsuarios,
} from '../firebase/funcionesFirestore.js';
import { btnLikes1 } from './categorias.js';
import { validateSessionStorage } from './validaciones.js';

const subirContainer = (idPost, dataCreador, dataPost) => {
  const divPost = document.createElement('div');
  divPost.classList.add('tableroPost');

  divPost.innerHTML = `
    <div class="usuarioPost" id="${idPost}">
        <div class="imgUsuarioPost"><img class="imgPost"src="${dataCreador.imgUsuario}"></div>
        <div class="infoUsuarioPost">
            <div class="nombreUsuarioPost"><p>${dataCreador.username}</p></div>
            <div class="descripcionUsuarioPost"><p>${dataCreador.descripcion}</p></div>
        </div>
        <button class="btnEdit"><img src="imagenes/edit.png"></button>
        <button class="btnDelete"><img src="imagenes/delete.png"></button>
    </div>
    <div class="estadoCompartido">
        <div class="contenidoCompartido">
            <p class="postcontent">${dataPost.publicacion}</p>
            <img src="${dataPost.imgPost}">
        </div>
    </div>
    <div class="botonesReaccion">
        <i class="ph-heart-bold like" name= "${idPost}"}></i>
        <p>${dataPost.likes.length}</p>        
    </div>
    `;
  return divPost;
};

export const btnEliminarPost = () => {
  const postsCards = document.getElementsByClassName('usuarioPost');
  Array.from(postsCards).forEach((postCard) => {
    const btnEliminar = postCard.querySelector('.btnDelete');
    btnEliminar.addEventListener('click', async () => {
      const confirmarcion = window.confirm('¿Esta seguro que quiere eliminar el post?');
      if (!confirmarcion) {
        return;
      }
      const postEliminado = document.getElementById(postCard.id);
      await eliminarPost(postCard.id);
      console.log('si elimino el post');
      postEliminado.parentElement.remove();
    });
  });
};

const editarPost = (postCard) => {
  const formularioEditar = document.createElement('form');
  formularioEditar.classList.add('editForm');
  formularioEditar.innerHTML = `
    <textarea id="inputEditar" name="inputEditar" rows="5" cols="33"></textarea>    
    <div class="secBtnEditarPost">
        <button class="botonGuardarCambios">Guardar</button>
        <button class="botonCancelarCambios">Cancelar</button>  
    </div>
`;
  const botonGuardarCambios = formularioEditar.querySelector('.botonGuardarCambios');
  const botonCancelarCambios = formularioEditar.querySelector('.botonCancelarCambios');
  const estadoCompartido = postCard.querySelector('.estadoCompartido');

  const contenidoCompartido = estadoCompartido.firstElementChild;
  formularioEditar.firstElementChild.value = contenidoCompartido.firstElementChild.textContent;

  // borramos el texto y agregamos el formulario de edicion
  estadoCompartido.innerHTML = '';
  estadoCompartido.appendChild(formularioEditar);

  botonCancelarCambios.addEventListener('click', (e) => {
    e.preventDefault();
    estadoCompartido.innerHTML = '';
    estadoCompartido.appendChild(contenidoCompartido);
  });

  botonGuardarCambios.addEventListener('click', (e) => {
    e.preventDefault();
    const postId = postCard.firstElementChild.id;
    const form = e.target.parentElement.parentElement;
    const changedText = form.firstElementChild.value;
    actualizarPost(postId, changedText)
      .then(() => {
        console.log('sabemos si funciono');
        contenidoCompartido.firstElementChild.textContent = changedText;
        estadoCompartido.innerHTML = '';
        estadoCompartido.appendChild(contenidoCompartido);
      });
  });
};

export const btnEditarPost = () => {
  const postsCards = document.getElementsByClassName('tableroPost');
  Array.from(postsCards).forEach((postCard) => {
    const btnPencil = postCard.querySelector('.btnEdit');
    btnPencil.addEventListener('click', async () => {
      editarPost(postCard);
    });
  });
};

const rellenarPerfil = async (containerPost) => {
  const userData = JSON.parse(sessionStorage.userSession);
  const usuarios = await obtenerUsuarios();
  const datosPost = await obtenerUserPosts();
  datosPost.forEach((post) => {
    const dataCreador = usuarios.filter((user) => user.userId === post.usuarioId);
    containerPost.prepend(subirContainer(post.id, dataCreador[0], post));
    if (post.likes.includes(userData.id)) {
      document.getElementsByName(post.id)[0].style.color = 'red';
    } else {
      document.getElementsByName(post.id)[0].style.color = '#8F7D7D';
    }
  });
  btnLikes1();
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
                  <img src="${userData.imgUsuario}">
              </span>
          </a>
      </li>
      </ul>
    `;
  const tableroInformacionUsuario = document.createElement('div');
  tableroInformacionUsuario.classList.add('fondo1');
  tableroInformacionUsuario.innerHTML = `
        <div class="fondoImagenPerfil">
            <img src="${userData.imgPortada}">
        </div>
        <div class="fondo2">
            <div class="imgPerfilUsuario">
                <img src="${userData.imgUsuario}">
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
  rellenarPerfil(contenedorPublicacionesPerfil);

  perfilSeccion.appendChild(navInferior);
  perfilSeccion.appendChild(tableroInformacionUsuario);
  perfilSeccion.appendChild(btnEditarPerfilResponsive);
  perfilSeccion.appendChild(contenedorPublicacionesPerfil);

  return perfilSeccion;
};
