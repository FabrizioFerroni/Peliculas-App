import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/features/auth/service/auth.service';
import { Rutas } from '../utils/rutas';

export const esAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.obtainRole() === 'admin') {
    return true;
  }
  router.navigate([Rutas.LOGIN]);
  return true;
};
