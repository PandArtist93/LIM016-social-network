// Creacion de la estructura y diseño del Home
export const fondoHome = (divFormulario) => {
  const fondo = `
      <section class="borde"><img src="imagenes/bordeSuperior.png"></section>
      <section class="cajaGrande">
        <div class="cajaInterna1">
          <img id="huellaLogo" src="imagenes/huellaLogo.png">
          <p class="slogan">“Porque nuestros peluditos necesitan de cuidado”</p>
        </div>
        ${divFormulario}
      </section>
      <section class="borde"><img src="imagenes/bordeInferior.png"></section>
    `;
  const divFondo = document.createElement('article');
  divFondo.setAttribute('id', 'artRegistro');
  divFondo.classList.add('artRegistro');
  divFondo.innerHTML = fondo;

  return divFondo;
};
