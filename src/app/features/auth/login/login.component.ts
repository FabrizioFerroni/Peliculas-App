import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilsService } from '@app/shared/services/utils.service';
import { AuthService } from '../service/auth.service';
import { AuthResponse, LoginDto } from '../dto/auth-dto';
import { NotificationUtils } from '@app/shared/utils/show-toast';
import { Router, RouterLink } from '@angular/router';
import { ToastType } from 'ng-angular-popup';
import { extraerErroresIdentity } from '@app/shared/functions/extraerErrores';
import { Rutas } from '@app/shared/utils/rutas';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  private formBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private readonly notif = inject(NotificationUtils);
  private readonly authService = inject(AuthService);
  register: string = Rutas.REGISTER;

  formLogin = this.formBuilder.group({
    email: ['', { validators: [Validators.email, Validators.required] }],
    password: [
      '',
      { validators: [Validators.required, Validators.minLength(8)] },
    ],
  });

  errors: string[] = [];

  ngOnInit(): void {
    this.utilsService.setTitle('Iniciar Sesión');
  }

  get getEmailField() {
    return this.formLogin.get('email');
  }

  get getEmailFieldErrors(): boolean {
    return !!(
      this.getEmailField?.invalid &&
      (this.getEmailField.dirty || this.getEmailField.touched)
    );
  }

  get getEmailFieldRequiredError(): boolean {
    return (
      this.getEmailField?.hasError('required')! &&
      (this.getEmailField?.dirty || this.getEmailField?.touched)!
    );
  }

  get getEmailFieldEmailError(): boolean {
    return (
      this.getEmailField?.hasError('email')! &&
      (this.getEmailField?.dirty || this.getEmailField?.touched)!
    );
  }

  get getPasswordField() {
    return this.formLogin.get('password');
  }

  get getPasswordFieldErrors(): boolean {
    return !!(
      this.getPasswordField?.invalid &&
      (this.getPasswordField.dirty || this.getPasswordField.touched)
    );
  }

  get getPasswordFieldRequiredError(): boolean {
    return (
      this.getPasswordField?.hasError('required')! &&
      (this.getPasswordField?.dirty || this.getPasswordField?.touched)!
    );
  }

  get getPasswordFieldMinLengthError(): boolean {
    return (
      this.getPasswordField?.hasError('minlength')! &&
      (this.getPasswordField?.dirty || this.getPasswordField?.touched)!
    );
  }

  guardarCambios() {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) {
      this.notif.toastMsg(
        ToastType.WARNING,
        `Debes completar todos los campos`,
        'Advertencia',
        5000
      );
      return;
    }

    const credenciales = this.formLogin.value as LoginDto;
    this.authService.login(credenciales).subscribe({
      next: (res: AuthResponse) => {
        this.notif.toastMsg(
          ToastType.SUCCESS,
          `Sesión iniciada con éxito`,
          'Éxito!',
          5000
        );
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
        this.errors = extraerErroresIdentity(error);
        this.notif.toastMsg(
          ToastType.DANGER,
          `Error al iniciar sesión: ${this.errors}`,
          'Error!',
          5000
        );
        /* this.notif.toastMsg(
          ToastType.DANGER,
          `Error al iniciar sesión: ${error.error.message}`,
          'Éxito!',
          5000
        ); */
      },
    });
  }
}
