import { contenidoHeader } from './headerMuro.js';
import { seccionMuro1 } from './secionFirstMuro.js';
import { seccionMuro2 } from './seccionSecMuro.js';

export const muro = () => {
  const articleMuro = document.createElement('article');
  articleMuro.classList.add('artMuro');
  articleMuro.setAttribute('id', 'artMuro');

  const headerMuro = document.createElement('header');
  headerMuro.classList.add('item1');
  headerMuro.innerHTML = contenidoHeader();

  const divSecciones = document.createElement('div');
  divSecciones.classList.add('grid-container');
  divSecciones.appendChild(seccionMuro1());
  divSecciones.appendChild(seccionMuro2());

  articleMuro.appendChild(headerMuro);
  articleMuro.appendChild(divSecciones);
  return articleMuro;
};

/* export const divMuro = `
<article class="artMuro"  id="artmuro">
    <header class="item1">
        <img src="imagenes/ImgUsuario.png" width="75px" height="75px">
        <img src="imagenes/CarePets.png" width="250px" height="50px" >
        <img id="cerrar-sesion" src="imagenes/sign-out 1.png" width="40px" height="40px" >
    </header>
    <div class="grid-container">
        <section class="item2">
            <section class="secUsuario">
                <div class="contenedorPortada">
                    <img src="imagenes/ImgDelUsuario.png">
                </div>
                <div class="contenedorPerfil">
                    <div class="ImgCentralUsuario">
                        <img src="imagenes/ImgUsuario.png">
                    </div>
                    <div class="datosUsuario">
                        <h2 class="nombreUsuario">Usuario</h2>
                        <h3 class="estadoUsuario">Amante de los animales</h3>
                    </div>
                </div>
            </section>
            <section class="secCategorias">
                <h1>Explorar</h1>
                <div>
                    <div class="categoriaUnica">
                        <img src="imagenes/refugioIcono.png" >
                        <p>Refugio</p>
                    </div>
                    <div class="categoriaUnica">
                        <img src="imagenes/reportarIcono.png" >
                        <p>Mascotas perdidas</p>
                    </div>
                    <div class="categoriaUnica">
                        <img src="imagenes/adoptarIcono.png" >
                        <p>Adoptar</p>
                    </div>
                    <div class="categoriaUnica">
                        <img src="imagenes/localizacionIcono.png" >
                        <p>Localización</p>
                    </div>
                    <div class="categoriaUnica">
                        <img src="imagenes/medicinasIcono.png" >
                        <p>Medicinas</p>
                    </div>
                </div>
            </section>
        </section>

        <section class="item3"> <!-- main -->
            <div class="tableroCompartir">
                <input type="text" placeholder="¿Qué quieres reportar?">
                <div class="botones">
                    <button class="botonCompartirImagen">
                      <img src="imagenes/botonCompartirImagen.png">
                    </button>
                    <button class="botonCompartir">Compartir</button>
                </div>
            </div>
            <div class="tableroPost">
                <div class="usuarioPost">
                    <div class="infoUsuarioPost">
                    </div>
                    <img>
                </div>
                <div class="estadoCompartido"></div>
                <div class="botonesReaccion">
                    <img src="imagenes/heartIcono.png">
                    <img src="imagenes/comentIcono.png">
                    <img src="imagenes/compartirIcono.png">
                    <img src="imagenes/emojiIcono.png">
                </div>
            </div>
        </section>
    </div>
    <footer class="item4"></footer>
</article>`; */
