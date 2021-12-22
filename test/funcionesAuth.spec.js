// importamos la funcion que vamos a testear
import { inicioSesionUsuario } from '../src/firebase/funcionesAuth';

jest.mock('../src/firebase/config');

describe('inicioSesionUsuario', () => {
  it('deberia ser una funcion', () => {
    expect(typeof inicioSesionUsuario).toBe('function');
  });
  it('los parametros de entrada deben ser válidos', () => {
    // nos retorna un objeto
    inicioSesionUsuario('fazahuanchef@gmail.com', 'ejemploClave')
      .then(() => {
      });
  });
});
