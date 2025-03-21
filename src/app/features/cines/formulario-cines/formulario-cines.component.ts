import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CineGetDto, CinePostDto } from '../dto/cines.dto';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Rutas } from '@app/shared/utils/rutas';
import { firstLetterUppercase } from '@app/shared/functions/validations';
import { MapaComponent } from '../../../shared/components/mapa/mapa.component';
import { ICoordenadas } from '@app/shared/components/mapa/interfaces/coordenada';

@Component({
  selector: 'app-formulario-cines',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MapaComponent],
  templateUrl: './formulario-cines.component.html',
  styleUrl: './formulario-cines.component.scss',
})
export class FormularioCinesComponent {
  @Input()
  dto?: CineGetDto | null = {
    id: '',
    nombre: '',
    latitud: 0,
    longitud: 0,
  };
  @Output() posteoFormulario = new EventEmitter<CinePostDto>();
  private fb = inject(FormBuilder);
  cineRoute: string = Rutas.CINES;
  coordenadasIniciales: ICoordenadas[] = [];

  form = this.fb.group({
    nombre: ['', { validators: [Validators.required, firstLetterUppercase()] }],
    latitud: new FormControl<number>(0, {
      validators: [Validators.required],
    }),
    longitud: new FormControl<number>(0, {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    if (this.dto) {
      this.form.patchValue(this.dto);
      this.coordenadasIniciales = [
        { latitud: this.dto.latitud!, longitud: this.dto.longitud! },
      ];
    }
  }

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

    const genero = this.form.value as CinePostDto;

    this.posteoFormulario.emit(genero);
    // this.form.reset();
  }

  coordenadaSeleccionada(coordenadas: ICoordenadas) {
    this.form.patchValue({
      latitud: coordenadas.latitud,
      longitud: coordenadas.longitud,
    });
  }
}
