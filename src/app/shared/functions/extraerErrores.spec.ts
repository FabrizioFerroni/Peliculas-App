import { extraerErrores } from './extraerErrores';

describe('extraerErrores', () => {
  it('should return an empty array if the object has no errors', () => {
    // Preparación
    const input = { error: { errors: {} } };

    // Prueba
    const result = extraerErrores(input);

    // Validación
    expect(result).toEqual([]);
  });

  it('must correctly extract error messages with their fields', () => {
    // Preparación
    const input = {
      error: {
        errors: {
          nombre: [
            'La primera letra debe ser mayúscula',
            'El nombre es requerido',
          ],
          email: ['El email no es válido', 'El email es requerido'],
          password: [
            'La contraseña es muy corta',
            'La contraseña es requerida',
          ],
        },
      },
    };

    // Prueba
    const result = extraerErrores(input);

    // Validación
    expect(result).toEqual([
      'nombre: La primera letra debe ser mayúscula',
      'nombre: El nombre es requerido',
      'email: El email no es válido',
      'email: El email es requerido',
      'password: La contraseña es muy corta',
      'password: La contraseña es requerida',
    ]);
  });
});
