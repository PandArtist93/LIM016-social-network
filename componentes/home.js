// Creación de la estructura y diseño del Home
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
      <div id="ubicacionModal"></div>
      <section class="borde"><img src="imagenes/bordeInferior.png"></section>
    `;
  const divFondo = document.createElement('article');
  divFondo.setAttribute('id', 'artRegistro');
  divFondo.classList.add('artRegistro');
  divFondo.innerHTML = fondo;
  return divFondo;
};

// Boton para mostrar y ocultar contraseña
export const mostrarYocultarClave = (boton, idInput) => {
  const botonContraseña = document.getElementById(boton);
  const clave = document.querySelector(`input[id=${idInput}]`);
  botonContraseña.addEventListener('click', () => {
    const type = clave.getAttribute('type') === 'password' ? 'text' : 'password';
    clave.setAttribute('type', type);
    botonContraseña.classList.toggle('ph-eye');
    botonContraseña.classList.toggle('ph-eye-closed');
  });
};
