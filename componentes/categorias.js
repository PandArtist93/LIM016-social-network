import { subirContainer } from './seccionSecMuro.js';
import {
  obtenerPostsGrupo,
  obtenerUsuarios,
  obtenerById,
  subirLikes,
} from '../firebase/funcionesFirestore.js';
import { validateSessionStorage } from './validaciones.js';

export const btnLikes1 = () => {
  const postsCards = document.getElementsByClassName('botonesReaccion');
  // console.log(postsCards);
  Array.from(postsCards).forEach((postCard) => {
    const btnLike = postCard.querySelector('.like');
    const userData = JSON.parse(sessionStorage.userSession);
    btnLike.addEventListener('click', async () => {
      const hijo = btnLike.getAttribute('name');
      const hermano = btnLike.nextElementSibling;
      const veamos = await obtenerById(hijo, 'posts');

      if (veamos.likes.includes(userData.id)) {
        subirLikes(hijo, veamos.likes.filter((item) => item !== userData.id));
        hermano.textContent = veamos.likes.length - 1;
        btnLike.style.color = '#8F7D7D';
        //
      } else {
        subirLikes(hijo, [...veamos.likes, userData.id]);
        hermano.textContent = veamos.likes.length + 1;
        btnLike.style.color = 'red';
      }
    });
  });
};

const mostrarPostPorCategoria = async (containerPost, grupo) => {
  const userData = JSON.parse(sessionStorage.userSession);
  const usuarios = await obtenerUsuarios();
  const datosPost = await obtenerPostsGrupo(grupo);
  datosPost.forEach((docs) => {
    const creadorPost = usuarios.filter((user) => user.userId === docs.usuarioId);
    containerPost.prepend(subirContainer(docs.postId, docs, creadorPost[0]));
    if (docs.likes.includes(userData.id)) {
      document.getElementsByName(docs.postId)[0].style.color = 'red';
    } else {
      document.getElementsByName(docs.postId)[0].style.color = '#8F7D7D';
    }
  });
  btnLikes1();
};

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
