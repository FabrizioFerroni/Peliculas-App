import { Component, inject, OnInit } from '@angular/core';
import { extraerErroresIdentity } from '@app/shared/functions/extraerErrores';
import { ToastType } from 'ng-angular-popup';
import { AuthResponse, LoginDto, RegisterDto } from '../dto/auth-dto';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UtilsService } from '@app/shared/services/utils.service';
import { NotificationUtils } from '@app/shared/utils/show-toast';
import { Rutas } from '@app/shared/utils/rutas';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  private formBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private readonly notif = inject(NotificationUtils);
  private readonly authService = inject(AuthService);
  login: string = Rutas.LOGIN;

  formRegister = this.formBuilder.group({
    email: ['', { validators: [Validators.email, Validators.required] }],
    username: ['', { validators: [Validators.required] }],
    password: [
      '',
      { validators: [Validators.required, Validators.minLength(8)] },
    ],
  });

  errors: string[] = [];

  ngOnInit(): void {
    this.utilsService.setTitle('Registrarse');
  }

  get getEmailField() {
    return this.formRegister.get('email');
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

  get getUsernameField() {
    return this.formRegister.get('username');
  }

  get getUsernameFieldErrors(): boolean {
    return !!(
      this.getUsernameField?.invalid &&
      (this.getUsernameField.dirty || this.getUsernameField.touched)
    );
  }

  get getUsernameFieldRequiredError(): boolean {
    return (
      this.getUsernameField?.hasError('required')! &&
      (this.getUsernameField?.dirty || this.getUsernameField?.touched)!
    );
  }

  get getPasswordField() {
    return this.formRegister.get('password');
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
    this.formRegister.markAllAsTouched();
    if (this.formRegister.invalid) {
      this.notif.toastMsg(
        ToastType.WARNING,
        `Debes completar todos los campos`,
        'Advertencia',
        5000
      );
      return;
    }

    const credenciales = this.formRegister.value as RegisterDto;
    this.authService.register(credenciales).subscribe({
      next: (res: AuthResponse) => {
        this.notif.toastMsg(
          ToastType.SUCCESS,
          `Usuario creado con éxito`,
          'Éxito!',
          5000
        );
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
