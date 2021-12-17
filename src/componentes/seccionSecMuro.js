import {
  obtenerPosts, obtenerPostById, subirPostA,
} from '../firebase/funcionesFirestore.js';

const subirContainer = (idPost, creadorPost, apodoUser, postTxt, srcImagenPost) => {
  const divTablero = document.createElement('div');
  divTablero.classList.add('tableroPost');
  divTablero.setAttribute('id', idPost);

  divTablero.innerHTML = `
    <div class="usuarioPost">
        <div class="imgUsuarioPost"><img class="imgPost"src="imagenes/ImgUsuario3.png"></div>
        <div class="infoUsuarioPost">
            <div class="nombreUsuarioPost"><p>${creadorPost}</p><img src="imagenes/bxs-user-plus 2.png"></div>
            <div class="descripcionUsuarioPost"><p>${apodoUser}</p></div>
        </div>
    </div>
    <div class="estadoCompartido">
        <div class="contenidoCompartido">
            <p>${postTxt}</p>
            <img src="${srcImagenPost}">
        </div>
    </div>
    <div class="botonesReaccion">
        <img src="imagenes/heartIcono.png" class="like">
        <img src="imagenes/comentIcono.png">
        <img src="imagenes/compartirIcono.png">
    </div>
    `;
  return divTablero;
};

const rellenarHome = async (conteinerPost) => {
  const datosPost = await obtenerPosts();
  datosPost.forEach((doc) => {
    conteinerPost.prepend(subirContainer(doc.postId, doc.creador, doc.descripcion, doc.publicacion, ''));
  });
};

export const seccionMuro2 = () => {
  const segundaSeccion = document.createElement('section');
  segundaSeccion.classList.add('item3');

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
  const tableroCompartir = document.createElement('form');
  tableroCompartir.setAttribute('id', 'formCompartir');
  tableroCompartir.classList.add('tableroCompartir');
  tableroCompartir.innerHTML = `
    <input type="text" placeholder="¿Qué quieres reportar?" id="inputCompartir">
    <div class="botones">
        <button class="botonCompartirImagen"><img src="imagenes/botonCompartirImagen.png"></button>
        <select name="Grupo" id="Grupo" class="Grupo">
            <option value="value1">Refugios</option>
            <option value="value2" selected>Reportar perdidos</option>
            <option value="value3">Adoptar</option>
            <option value="value4">Lugares</option>
            <option value="value5">Donaciones</option>
            <option value="value6"></option>
        </select>
        <button class="botonCompartir">Compartir</button>
    </div>
    `;
  const contenedorPublicaciones = document.createElement('div');
  contenedorPublicaciones.classList.add('container-post');
  contenedorPublicaciones.setAttribute('id', 'container-post');
  contenedorPublicaciones.prepend(subirContainer('Maria Casas', 'catLover', 'Adoptar una mascota es cambiar dos vidas: la de la mascota que al fin olvidará sus duros días sin familia y la de quien se convertirá en su dueño y tendrá días cargados de amor. Si te interesa acoger a un nuevo miembro en tu hogar, estas son algunas de las muchas opciones que encuentras para adoptar animales en Lima.', ''));
  rellenarHome(contenedorPublicaciones);

  segundaSeccion.appendChild(navInferior);
  segundaSeccion.appendChild(tableroCompartir);
  segundaSeccion.appendChild(contenedorPublicaciones);
  return segundaSeccion;
};

export const creacionPost = (formCompartir, containerPost) => {
  const divCompartir = document.getElementById(formCompartir);
  const containerPosts = document.getElementById(containerPost);
  divCompartir.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputCompartir = document.getElementById('inputCompartir').value;
    const userData = JSON.parse(sessionStorage.userSession);
    await subirPostA('home', userData.id, inputCompartir, userData.username, userData.descripcion)
      .then((doc) => {
        obtenerPostById(doc.id).then((postsById) => {
          containerPosts.prepend(subirContainer(doc.id, postsById.creador, postsById.descripcion, postsById.publicacion, ''));
        });
      });
    divCompartir.reset();
  });
};

export const menuPuntosHorizontales = () => {
  const puntosHorizontales = document.querySelector('.puntosHorizontales');
  const middle2 = document.querySelector('.middle2');
  const desplegable2 = document.querySelector('.desplegable2');
  puntosHorizontales.addEventListener('click', () => {
    middle2.classList.toggle('active');
    desplegable2.classList.toggle('active');
  });
};
