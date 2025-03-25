import { Component, computed, inject, Input } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [],
  providers: [AuthService],
  template: `
    @if(isAuthorizedFn()){
    <ng-content select="[authorized]" />
    } @else {
    <ng-content select="[unauthorized]" />
    }
  `,
})
export class AuthorizedComponent {
  @Input()
  rol?: string;
  private readonly authService: AuthService = inject(AuthService);

  private readonly isAuthorized = computed(() => {
    if (this.rol) {
      return this.authService.obtainRole() === this.rol;
    } else {
      return this.authService.isLogged();
    }
  });

  isAuthorizedFn = () => this.isAuthorized();
}
