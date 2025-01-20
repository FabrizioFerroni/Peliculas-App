import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function firstLetterUppercase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor: string = control.value as string;

    if (!valor) return null;

    if (valor.length === 0) return null;

    const primeraLetra = valor.charAt(0);

    if (primeraLetra !== primeraLetra.toUpperCase()) {
      return {
        firstLetterUppercase: {
          mensaje: 'La primera letra debe ser mayúscula',
        },
      };
    }

    return null;
  };
}

export function durationNotNegative(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const duration = control.value;

    if (duration <= 0) {
      return {
        durationNotNegative: {
          mensaje: 'La duración no puede ser menor a 0 minutos',
        },
      };
    }

    return null;
  };
}

export function dateDoNotFuture(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateSelected = new Date(control.value);
    const today = new Date();

    if (dateSelected > today) {
      return {
        dateDoNotFuture: {
          mensaje: 'La fecha no puede ser en el futuro',
        },
      };
    }

    return null;
  };
}
