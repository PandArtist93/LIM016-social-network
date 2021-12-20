import { subirContainer } from './seccionSecMuro.js';
import {
  obtenerPostsGrupo,
  obtenerUsuarios,
  obtenerPostById,
  subirLikes,
} from '../firebase/funcionesFirestore.js';

export const btnLikes1 = () => {
  const postsCards = document.getElementsByClassName('botonesReaccion');
  // console.log(postsCards);
  Array.from(postsCards).forEach((postCard) => {
    const btnLike = postCard.querySelector('.like');
    btnLike.addEventListener('click', async () => {
      const hijo = btnLike.getAttribute('name');
      const hermano = btnLike.nextElementSibling;
      // console.log(hermano);
      const userData = JSON.parse(sessionStorage.userSession);
      const veamos = await obtenerPostById(hijo);
      // console.log(veamos);
      if (veamos.likes.includes(userData.id)) {
        console.log('esta');
        subirLikes(hijo, veamos.likes.filter((item) => item !== userData.id));
        hermano.textContent = veamos.likes.length;
      } else {
        console.log('no esta');
        subirLikes(hijo, [...veamos.likes, userData.id]);
        hermano.textContent = veamos.likes.length;
      }
    });
  });
};

const mostrarPostPorCategoria = async (containerPost, grupo) => {
  const usuarios = await obtenerUsuarios();
  const datosPost = await obtenerPostsGrupo(grupo);
  datosPost.forEach((docs) => {
    const creadorPost = usuarios.filter((user) => user.userId === docs.usuarioId);
    containerPost.prepend(subirContainer(docs.postId, docs, creadorPost[0]));
  });
  btnLikes1();
};

export const contenidoCategoria = (imgsrc, tituloCategoria) => {
  const categoriaSeccion = document.createElement('section');
  categoriaSeccion.classList.add('item3');

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
