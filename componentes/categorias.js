import { renderPost } from './seccionSecMuro.js';
import {
  obtenerPostsGrupo,
  obtenerUsuarios,
  obtenerById,
  subirLikes,
} from '../firebase/funcionesFirestore.js';
import { validateSessionStorage } from './validaciones.js';

// Reconoce todos los botones likes de cada publicacion
export const btnLikes1 = () => {
  const botonesPost = document.getElementsByClassName('botonesReaccion');

  // Busca donde se encuentra el target de reaccion en este caso 'like'
  Array.from(botonesPost).forEach((botonPost) => {
    const btnLike = botonPost.querySelector('.like');
    const userData = JSON.parse(sessionStorage.userSession);

    // Reconoce al boton y contador que se encuentra a lado
    btnLike.addEventListener('click', async () => {
      // se encuentra el id del post que esta asociado al atributo name y guardado en el idLike
      const idLike = btnLike.getAttribute('name');
      const contadorLike = btnLike.nextElementSibling;
      const dataPost = await obtenerById(idLike, 'posts');
      // verificando si el id del usuario esta en el array de likes de cada post
      if (dataPost.likes.includes(userData.id)) {
        // esto es para quitar el like por usuario
        subirLikes(idLike, dataPost.likes.filter((item) => item !== userData.id));
        contadorLike.textContent = dataPost.likes.length - 1;
        btnLike.style.color = '#8F7D7D';
      } else {
        // esto es para agregar like por usuario
        subirLikes(idLike, [...dataPost.likes, userData.id]);
        contadorLike.textContent = dataPost.likes.length + 1;
        btnLike.style.color = 'red';
      }
    });
  });
};

// Rellenar sección de categorias
const mostrarPostPorCategoria = async (containerPost, grupo) => {
  const userData = JSON.parse(sessionStorage.userSession);
  // Obtener data de los usuarios
  const usuarios = await obtenerUsuarios();
  // Obtener los post con la categoria que coincida con parametro grupo
  const datosPost = await obtenerPostsGrupo(grupo);
  datosPost.forEach((docs) => {
    // buscar información del creador de cada post
    const creadorPost = usuarios.filter((user) => user.userId === docs.usuarioId);
    containerPost.prepend(renderPost(docs.postId, docs, creadorPost[0]));
    // verificando si el id del usuario logueado se encuentra en el array de likes
    // de ser correcto se pinta de rojo
    if (docs.likes.includes(userData.id)) {
      document.getElementsByName(docs.postId)[0].style.color = 'red';
    }
  });
  btnLikes1();
};

// Renderizando el contenido categoria
export const contenidoCategoria = (imgsrc, tituloCategoria) => {
  const categoriaSeccion = document.createElement('section');
  categoriaSeccion.classList.add('item3');

  const navInferior = document.createElement('nav');
  navInferior.classList.add('barraNavegacionInferior');
  const userData = validateSessionStorage();
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
  const divCategoriaMasBtn = document.createElement('div');
  divCategoriaMasBtn.setAttribute('id', 'tituloCategoria');
  divCategoriaMasBtn.innerHTML = `
    <div class="categoriaUnica">
        <img src=${imgsrc}>
        <p>${tituloCategoria}</p>
    </div>
    <div class="botonesDelPerfil">
        <button class="btnInicio"><a href="#/artmuro">Volver a Inicio</a></button>
    </div>
    `;
  const contenedorPostRefugio = document.createElement('div');
  contenedorPostRefugio.classList.add('container-post');
  contenedorPostRefugio.setAttribute('id', 'container-post');
  mostrarPostPorCategoria(contenedorPostRefugio, tituloCategoria);

  categoriaSeccion.appendChild(navInferior);
  categoriaSeccion.appendChild(divCategoriaMasBtn);
  categoriaSeccion.appendChild(contenedorPostRefugio);
  return categoriaSeccion;
};
