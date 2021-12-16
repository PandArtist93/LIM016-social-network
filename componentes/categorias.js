export const seccionAdoptar = () => {
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
    // segun el figma, en vez del formulario agregar el titulo de la seccion adoptar , su icono, y el boton
    const contenedorPublicaciones = document.createElement('div');
    contenedorPublicaciones.classList.add('container-post');
    contenedorPublicaciones.setAttribute('id', 'container-post');
    contenedorPublicaciones.prepend(subirContainer('Maria Casas', 'catLover', 'Adoptar una mascota es cambiar dos vidas: la de la mascota que al fin olvidará sus duros días sin familia y la de quien se convertirá en su dueño y tendrá días cargados de amor. Si te interesa acoger a un nuevo miembro en tu hogar, estas son algunas de las muchas opciones que encuentras para adoptar animales en Lima.', ''));
    
    // traer todos los documentos de la coleccion adoptar
    
    segundaSeccion.appendChild(navInferior);
    segundaSeccion.appendChild(tableroCompartir);
    segundaSeccion.appendChild(contenedorPublicaciones);
    return segundaSeccion;
  };