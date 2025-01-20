import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstLetterUppercase } from '@app/shared/functions/validations';
import { Rutas } from '@app/shared/utils/rutas';
import { RouterLink } from '@angular/router';
import { GeneroGetDto, GeneroPostDto } from '../dto/generos.dto';

@Component({
  selector: 'app-formulario-genero',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.scss',
})
export class FormularioGeneroComponent {
  @Input({ required: false })
  dto?: GeneroGetDto | null = { id: '', nombre: '' };
  @Output() posteoFormulario = new EventEmitter<GeneroPostDto>();
  private fb = inject(FormBuilder);
  generoRoute: string = Rutas.GENEROS;

  ngOnInit() {
    if (this.dto) {
      this.form.patchValue(this.dto);
    }
  }

  form = this.fb.group({
    nombre: ['', { validators: [Validators.required, firstLetterUppercase()] }],
  });

  get getNombreField() {
    return this.form.get('nombre');
  }

  get getNombreFieldErrors(): boolean {
    return !!(
      this.getNombreField?.invalid &&
      (this.getNombreField.dirty || this.getNombreField.touched)
    );
  }

  get getNombreFieldRequiredError(): boolean {
    return (
      this.getNombreField?.hasError('required')! &&
      (this.getNombreField?.dirty || this.getNombreField?.touched)!
    );
  }

  get getNombreFieldFirstLetterUppercaseError(): boolean {
    return (
      this.getNombreField?.hasError('firstLetterUppercase')! &&
      (this.getNombreField?.dirty || this.getNombreField?.touched)!
    );
  }

  guardarCambios() {
    // Realizar las acciones de guardado y redireccionar al listado de generos
    if (this.form.invalid) {
      return;
    }

    const genero = this.form.value as GeneroPostDto;

    this.posteoFormulario.emit(genero);
    // this.form.reset();
  }
}
