import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import { IconType } from './IconType';
import { Router } from '@angular/router';
export const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', swal.stopTimer);
    toast.addEventListener('mouseleave', swal.resumeTimer);
  },
});

export default function showMessageSw(
  message: string,
  icon: IconType,
  title: string,
  cancelButton: boolean,
  redirect: boolean,
  router: Router | null,
  ruta: string | null
) {
  Swal.fire({
    title,
    text: message,
    icon: icon,
    showCancelButton: cancelButton,
    confirmButtonColor: '#5c62ec',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    customClass: {
      cancelButton: 'outnone',
      confirmButton: 'outnone',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (redirect) {
        router?.navigate([ruta]);
      }
    }
  });
}
