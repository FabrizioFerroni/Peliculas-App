import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActoresGetDto, ActoresPostDto } from '../dto/actores.dto';
import { Rutas } from '@app/shared/utils/rutas';
import {
  dateDoNotFuture,
  firstLetterUppercase,
} from '@app/shared/functions/validations';
import { InputImgComponent } from '@app/shared/components/input-img/input-img.component';

@Component({
  selector: 'app-formulario-actores',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputImgComponent],
  templateUrl: './formulario-actores.component.html',
  styleUrl: './formulario-actores.component.scss',
})
export class FormularioActoresComponent {
  @Input({ required: false })
  dto?: ActoresGetDto | null = {
    id: '',
    nombre: '',
    fechaNacimiento: null,
    foto: '',
  };
  @Output() posteoActor = new EventEmitter<ActoresPostDto>();
  private fb = inject(FormBuilder);
  actorRoute: string = Rutas.ACTORES;
  imgOutput: File | null = File as unknown as File;

  ngOnInit() {
    if (this.dto) {
      const formValue = {
        ...this.dto,
        fechaNacimiento: this.dto.fechaNacimiento
          ? this.dto.fechaNacimiento.toISOString().split('T')[0]
          : null,
        foto: this.dto.foto ? new File([], this.dto.foto) : null,
      };
      this.form.patchValue(formValue);
    }
  }

  form = this.fb.group({
    nombre: ['', { validators: [Validators.required, firstLetterUppercase()] }],
    fechaNacimiento: new FormControl<string | null>(null),
    foto: new FormControl<File | null>(null),
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

  get getFechaNacimientoField() {
    return this.form.get('fechaNacimiento');
  }

  get getFechaNacimientoFieldErrors(): boolean {
    return !!(
      this.getFechaNacimientoField?.invalid &&
      (this.getFechaNacimientoField.dirty ||
        this.getFechaNacimientoField.touched)
    );
  }

  get getFechaNacimientoFieldRequiredError(): boolean {
    return (
      this.getFechaNacimientoField?.hasError('required')! &&
      (this.getFechaNacimientoField?.dirty ||
        this.getFechaNacimientoField?.touched)!
    );
  }

  get getFechaNacimientoFieldDateDoNotFutureError(): boolean {
    return (
      this.getFechaNacimientoField?.hasError('dateDoNotFuture')! &&
      (this.getFechaNacimientoField?.dirty ||
        this.getFechaNacimientoField?.touched)!
    );
  }

  imgFile(file: File) {
    if (file) {
      this.imgOutput = file;
    } else {
      this.imgOutput = null;
    }
    this.form.controls.foto.setValue(file);
  }

  guardarCambios() {
    if (this.form.invalid) {
      return;
    }

    const actor: ActoresPostDto = {
      nombre: this.form.value.nombre!,
      fechaNacimiento: new Date(this.form.value.fechaNacimiento!),
      foto: this.imgOutput,
    };

    if (typeof actor.foto === 'function') {
      actor.foto = null;
    }

    this.posteoActor.emit(actor);
  }
}
