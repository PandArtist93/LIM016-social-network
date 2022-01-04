import {
  obtenerPosts, obtenerById, subirDataHomeCol, subirLikes, obtenerUsuarios,
} from '../firebase/funcionesFirestore.js';
import { subirFileStorage } from '../firebase/funcionesStorage.js';
// import { validateSessionStorage } from './validaciones.js';

// Renderizar todos los posts
export const renderPost = (idPost, dataPost, dataCreador) => {
  const divTablero = document.createElement('div');
  divTablero.classList.add('tableroPost');

  divTablero.innerHTML = `
    <div class="usuarioPost" id= "${idPost}">
        <div class="imgUsuarioPost"><img class="imgPost"src="${dataCreador.imgUsuario}"></div>
        <div class="infoUsuarioPost">
            <div class="nombreUsuarioPost"><p>${dataCreador.username}</p></div>
            <div class="descripcionUsuarioPost"><p>${dataCreador.descripcion}</p></div>
        </div>
    </div>
    <div class="estadoCompartido">
        <div class="contenidoCompartido">
            <p>${dataPost.publicacion}</p>
            <img src="${dataPost.imgPost}">
        </div>
    </div>
    <div class="botonesReaccion">
        <i class="ph-heart-bold like" name= "${idPost}"}></i>
        <p>${dataPost.likes.length}</p>
    </div>
    `;

  return divTablero;
};

// Simula el contador en Firestore como array de usuarios que dan click
export const handleLikes = async (e) => {
  const btnLike = e.target;
  const userData = JSON.parse(sessionStorage.userSession);
  // se encuentra el id del post que esta asociado al atributo name y guardado en el idLike
  const idLike = btnLike.getAttribute('name');
  const dataPost = await obtenerById(idLike, 'posts');
  // verificando si el id del usuario esta en el array de likes de cada post
  if (dataPost.likes.includes(userData.id)) {
    // esto es para quitar el like por usuario
    subirLikes(idLike, dataPost.likes.filter((item) => item !== userData.id));
    btnLike.style.color = '#8F7D7D';
  } else {
    // esto es para agregar like por usuario
    subirLikes(idLike, [...dataPost.likes, userData.id]);
    btnLike.style.color = 'red';
  }
};

// Reconoce todos los botones likes de cada publicacion
export const btnLikes = () => {
  const botonesPost = document.getElementsByClassName('botonesReaccion');

  // Busca donde se encuentra el target de reaccion en este caso 'like'
  Array.from(botonesPost).forEach((botonPost) => {
    const btnLike = botonPost.querySelector('.like');

    // Reconoce al boton
    btnLike.addEventListener('click', handleLikes);
  });
};

// Muestra todos los posts en muro/timeline principal
const rellenarHome = async (conteinerPost) => {
  const userData = JSON.parse(sessionStorage.userSession);
  const usuarios = await obtenerUsuarios();
  await obtenerPosts((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (window.location.hash === '#/artmuro') {
        if (change.type === 'added') {
          const creadorPost = usuarios
            .filter((user) => user.userId === change.doc.data().usuarioId);
          // console.log(creadorPost[0]);
          conteinerPost.prepend(renderPost(change.doc.id, change.doc.data(), creadorPost[0]));

          if (change.doc.data().likes.includes(userData.id)) {
            document.getElementsByName(change.doc.id)[0].style.color = 'red';
          }
          btnLikes();
        }
        if (change.type === 'modified') {
          const btnLike = document.getElementsByName(change.doc.id);
          const hermano = btnLike[0].nextElementSibling;
          hermano.textContent = change.doc.data().likes.length;
          btnLikes();
        }
        if (change.type === 'removed') {
          /* const postEliminado = document.getElementById(change.doc.id);
          postEliminado.parentElement.remove(); */
        }
      }
    });
  });
};

// Renderizando barra de navegacion inferior, tablero compartir y contenedor categorias
export const seccionMuro2 = () => {
  const segundaSeccion = document.createElement('section');
  segundaSeccion.classList.add('item3');

  const navInferior = document.createElement('nav');
  navInferior.classList.add('barraNavegacionInferior');
  const userData = JSON.parse(sessionStorage.userSession);
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
  const tableroCompartir = document.createElement('form');
  tableroCompartir.setAttribute('id', 'formCompartir');
  tableroCompartir.classList.add('tableroCompartir');
  tableroCompartir.innerHTML = `
    <textarea id="inputCompartir" placeholder="¿Qué quieres reportar?" rows="8" cols="76"></textarea>  
    
    <div class="botones">
        <input type="file" placeholder="Añadir Imagen" id="compartirImg">         
        <select name="Grupo" id="Grupo" class="Grupo">
          <option value="" selected disabled>Grupo</option>
          <option value="Refugios">Refugios</option>
          <option value="Mascotas Perdidas">Mascotas Perdidas</option>
          <option value="Adoptar">Adoptar</option>
          <option value="Lugares">Lugares</option>
          <option value="Donaciones">Donaciones</option>
        </select>
        <button class="botonCompartir">Compartir</button>
          
    </div>
  `;

  const containerModalCategorias = document.createElement('div');
  containerModalCategorias.classList.add('categorias-container');
  containerModalCategorias.setAttribute('id', 'categoriasContainer');
  containerModalCategorias.innerHTML = `
    <div class="modal-categorias modal-close" >
        <p class="xClose">X</p>
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
    </div>
  `;

  const contenedorPublicaciones = document.createElement('div');
  contenedorPublicaciones.classList.add('container-post');
  contenedorPublicaciones.setAttribute('id', 'container-post');
  rellenarHome(contenedorPublicaciones);

  segundaSeccion.appendChild(navInferior);
  segundaSeccion.appendChild(tableroCompartir);
  segundaSeccion.appendChild(contenedorPublicaciones);
  return segundaSeccion;
};

// Funcionalidad para la creacion de posts con texto y/o imagen
export const creacionPost = (formCompartir) => {
  const divCompartir = document.getElementById(formCompartir);

  divCompartir.addEventListener('submit', async (e) => {
    e.preventDefault();
    // eleccion de la categoria donde quiere subir el post el usuario
    const selectCategoria = e.target.querySelector('#Grupo');
    const categoria = selectCategoria.options[selectCategoria.selectedIndex].value;

    // eleccion del archivo que quiere subir el usuario al post
    const archivoLocal = e.target.querySelector('#compartirImg').files[0];

    // obtener el campo txt del formulario (falta validar el formulario, OJO!)
    const postTxt = e.target.querySelector('#inputCompartir').value;

    const userData = JSON.parse(sessionStorage.userSession);

    if (archivoLocal === undefined) {
      // si no se elige ningun archivo se manda vacio
      await subirDataHomeCol(userData.id, postTxt, categoria, '');
    } else {
      // obtencion de la url del archivo subido desde el storage
      const urlImagen = await subirFileStorage(archivoLocal, 'imgPosts');
      await subirDataHomeCol(userData.id, postTxt, categoria, urlImagen);
      /* .then((doc) => {
        obtenerById(doc.id, 'posts').then((postsById) => {
          containerPosts.prepend(subirContainer(doc.id, postsById, ''));
        });
      }); */
    }
    e.target.reset();
  });
};
