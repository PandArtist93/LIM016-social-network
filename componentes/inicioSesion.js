import { inicioSesionUsuario } from '../firebase/funcionesAuth.js';

export const inicioSesion = (correo, contraseña, selector) => {
  const iniciarCon = document.getElementById(selector);
  iniciarCon.addEventListener('submit', (e) => {
    e.preventDefault();
    const correoIngreso = document.getElementById(correo).value;
    const claveIngreso = document.getElementById(contraseña).value;
    inicioSesionUsuario(correoIngreso, claveIngreso)
      .then((userCredential) => {       
        console.log(userCredential);
        /* alert('datos correctos'); */
        const ubicacionModalExito = document.getElementById("ubicacionModalExito");        
        ubicacionModalExito.innerHTML = modalExitoMensaje.modalExito();
        setTimeout(function(){       
          modalExito.classList.toggle("modalExito"); 
        },3000);       
      })
      .catch((error) => {
        console.log(error);
        /* alert('datos incorrectos'); */
        const ubicacionModalError = document.getElementById("ubicacionModalError");
        ubicacionModalError.innerHTML =  modalErrorMensaje.modalError();
        setTimeout(function(){       
          modalError.style.opacity = "1";
          modalError.style.visibility = "visible";  
        },1000);       
        
      });
  });
};

// Creacion de formularios de Home de forma dinamica
export const forms2 = {
  inicioSesion: () => {
    const formIngreso = `
        <div id="inicio" class="cajaInterna2">
            <form id="formIngreso">
                <div class="seccionIngreso">
                    <input type="text" id="correoIngreso" class="datosIngreso" placeholder="Correo electrónico" required>
                        <img src="imagenes/envelope.png">
                </div>
                
                <div class="seccionIngreso">
                    <input type="password" id="claveIngreso" class="datosIngreso" placeholder="Contraseña" required>
                    <img src="imagenes/eye-closed.png">
                </div>
                
                <button type="submit" id="botonIngresar" class="iniciarSesion">Ingresar</button>
                            
                <p class="texto">O bien ingresa con</p>
                
                <div class="logosInicio">
                    <img src="imagenes/FacebookOriginal.png">
                    <img src="imagenes/GoogleOriginal.png">
                </div>
                
                <p class="texto">¿No tienes una cuenta? <a id="registrate" href="#/registro"> Regístrate</a></p> 
            </form> 
            <div id= "ubicacionModalExito"></div>
            <div id= "ubicacionModalError"></div>
        </div>`;
    return formIngreso;
  },
};

export const modalErrorMensaje = {
  modalError: () => {
    const errorMensaje = `
      <div class= "modalError" id="modalError">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Ingrese los datos correctamente</p>
      </div>
    `
    return errorMensaje;
  }
};

export const modalExitoMensaje = {
  modalExito: () => {
    const exitoMensaje = `
      <div class= "modalExito" id="modalExito">
      <i class="fas fa-check-circle" ></i>
        <p>Inicio de Sesión exitoso!</p>
      </div>
    `
    return exitoMensaje;
  }
};