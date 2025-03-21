import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '@app/shared/components/input-img/input-img.component';
import { PeliculaGetDto, PeliculaPostDto } from '../dto/pelicula.dto';
import {
  durationNotNegative,
  firstLetterUppercase,
} from '@app/shared/functions/validations';
import { Rutas } from '@app/shared/utils/rutas';
import { ISelectorMultiple } from '@app/shared/components/selector-multiple/interfaces/selector-multiple.dto';
import { SelectorMultipleComponent } from '../../../shared/components/selector-multiple/selector-multiple.component';
import { AutocompleteActoresComponent } from '../../actores/autocomplete-actores/autocomplete-actores.component';
import { ActorAutoCompleteDTO } from '@app/features/actores/dto/actores.dto';

@Component({
  selector: 'app-formulario-peliculas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputImgComponent,
    SelectorMultipleComponent,
    AutocompleteActoresComponent,
  ],
  templateUrl: './formulario-peliculas.component.html',
  styleUrl: './formulario-peliculas.component.scss',
})
export class FormularioPeliculasComponent {
  @Input()
  dto?: PeliculaGetDto;
  @Input({ required: true })
  method: string = 'Crear';

  @Output() posteoFormulario = new EventEmitter<PeliculaPostDto>();
  private fb = inject(FormBuilder);
  peliculaRoute: string = Rutas.HOME;
  imgOutput: File | null = File as unknown as File;
  @Input({ required: true })
  generosSeleccionados: ISelectorMultiple[] = [];
  @Input({ required: true })
  generosNoSeleccionados: ISelectorMultiple[] = [];
  @Input({ required: true })
  cinesSeleccionados: ISelectorMultiple[] = [];
  @Input({ required: true })
  cinesNoSeleccionados: ISelectorMultiple[] = [];
  @Input({ required: true })
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  ngOnInit() {
    if (this.dto) {
      /* this.form.patchValue(this.dto); */
      const fechaFormateada = this.dto.fechaLanzamiento
        ? new Date(this.dto.fechaLanzamiento).toISOString().substring(0, 10)
        : null;

      this.form.patchValue({
        ...this.dto,
        fechaLanzamiento: fechaFormateada,
      });
    }
  }

  form = this.fb.group({
    titulo: new FormControl<string | null>(null, {
      validators: [Validators.required, firstLetterUppercase()],
    }),
    descripcion: new FormControl<string | null>(null, {
      validators: [Validators.required, firstLetterUppercase()],
    }),
    fechaLanzamiento: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    duracion: new FormControl<number | null>(null, {
      validators: [Validators.required, durationNotNegative()],
    }),
    anioLanzamiento: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    poster: new FormControl<File | string | null>(null, {
      validators: [Validators.required],
    }),
    generos: new FormControl<string[] | null>(null),
    enCines: new FormControl<boolean>(false),
    proximosEstrenos: new FormControl<boolean>(false),
    director: new FormControl<string | null>(null, {
      validators: [Validators.required, firstLetterUppercase()],
    }),
    trailer: new FormControl<string | null>(null),
  });

  imgFile(file: File) {
    if (file) {
      this.imgOutput = file;
    } else {
      this.imgOutput = null;
    }
    this.form.controls.poster.setValue(file);
  }

  guardarCambios() {
    if (this.form.invalid) {
      return;
    }

    const generosIds: string[] = this.generosSeleccionados.map((s) => s.id);
    const cinesIds: string[] = this.cinesSeleccionados.map((s) => s.id);

    const pelicula: PeliculaPostDto = {
      titulo: this.form.value.titulo!,
      descripcion: this.form.value.descripcion!,
      fechaLanzamiento: new Date(this.form.value.fechaLanzamiento!),
      duracion: this.form.value.duracion!,
      anioLanzamiento: this.form.value.anioLanzamiento!,
      poster: this.imgOutput,
      enCines: this.form.value.enCines!,
      proximosEstrenos: this.form.value.proximosEstrenos!,
      director: this.form.value.director!,
      actores: this.actoresSeleccionados,
      trailer: this.form.value.trailer!,
      generosIds,
      cinesIds,
    };

    if (typeof pelicula.poster === 'function') {
      pelicula.poster = null;
    }

    this.posteoFormulario.emit(pelicula);
  }

  get getTituloField() {
    return this.form.get('titulo');
  }

  get getTituloFieldErrors(): boolean {
    return !!(
      this.getTituloField?.invalid &&
      (this.getTituloField.dirty || this.getTituloField.touched)
    );
  }

  get getTituloFieldRequiredError(): boolean {
    return (
      this.getTituloField?.hasError('required')! &&
      (this.getTituloField?.dirty || this.getTituloField?.touched)!
    );
  }

  get getTituloFieldFirstLetterUppercaseError(): boolean {
    return (
      this.getTituloField?.hasError('firstLetterUppercase')! &&
      (this.getTituloField?.dirty || this.getTituloField?.touched)!
    );
  }

  get getDescripcionField() {
    return this.form.get('descripcion');
  }

  get getDescripcionFieldErrors(): boolean {
    return !!(
      this.getDescripcionField?.invalid &&
      (this.getDescripcionField.dirty || this.getDescripcionField.touched)
    );
  }

  get getDescripcionFieldRequiredError(): boolean {
    return (
      this.getDescripcionField?.hasError('required')! &&
      (this.getDescripcionField?.dirty || this.getDescripcionField?.touched)!
    );
  }

  get getDescripcionFieldFirstLetterUppercaseError(): boolean {
    return (
      this.getDescripcionField?.hasError('firstLetterUppercase')! &&
      (this.getDescripcionField?.dirty || this.getDescripcionField?.touched)!
    );
  }

  get getDuracionField() {
    return this.form.get('duracion');
  }

  get getDuracionFieldErrors(): boolean {
    return !!(
      this.getDuracionField?.invalid &&
      (this.getDuracionField.dirty || this.getDuracionField.touched)
    );
  }

  get getDuracionFieldRequiredError(): boolean {
    return (
      this.getDuracionField?.hasError('required')! &&
      (this.getDuracionField?.dirty || this.getDuracionField?.touched)!
    );
  }

  get getDuracionFieldDurationNotNegativeError(): boolean {
    return (
      this.getDuracionField?.hasError('durationNotNegative')! &&
      (this.getDuracionField?.dirty || this.getDuracionField?.touched)!
    );
  }

  get getAnioField() {
    return this.form.get('anioLanzamiento');
  }

  get getAnioFieldErrors(): boolean {
    return !!(
      this.getAnioField?.invalid &&
      (this.getAnioField.dirty || this.getAnioField.touched)
    );
  }

  get getAnioFieldRequiredError(): boolean {
    return (
      this.getAnioField?.hasError('required')! &&
      (this.getAnioField?.dirty || this.getAnioField?.touched)!
    );
  }

  get getPosterField() {
    return this.form.get('poster');
  }

  get getPosterFieldErrors(): boolean {
    return !!(this.getPosterField?.invalid && this.getPosterField.dirty);
  }

  get getPosterFieldRequiredError(): boolean {
    return (
      this.getPosterField?.hasError('required')! &&
      (this.getPosterField?.dirty || this.getPosterField?.touched)!
    );
  }

  get getGenerosField() {
    return this.form.get('generos');
  }

  get getGenerosFieldErrors(): boolean {
    return !!(
      this.getGenerosField?.invalid &&
      (this.getGenerosField.dirty || this.getGenerosField.touched)
    );
  }

  get getGenerosFieldRequiredError(): boolean {
    return (
      this.getGenerosField?.hasError('required')! &&
      (this.getGenerosField?.dirty || this.getGenerosField?.touched)!
    );
  }

  get getEnCinesField() {
    return this.form.get('enCines');
  }

  get getEnCinesFieldErrors(): boolean {
    return !!(
      this.getEnCinesField?.invalid &&
      (this.getEnCinesField.dirty || this.getEnCinesField.touched)
    );
  }
  get getEnCinesFieldRequiredError(): boolean {
    return (
      this.getEnCinesField?.hasError('required')! &&
      (this.getEnCinesField?.dirty || this.getEnCinesField?.touched)!
    );
  }

  get getProximosEstrenosField() {
    return this.form.get('proximosEstrenos');
  }

  get getProximosEstrenosFieldErrors(): boolean {
    return !!(
      this.getProximosEstrenosField?.invalid &&
      (this.getProximosEstrenosField.dirty ||
        this.getProximosEstrenosField.touched)
    );
  }

  get getProximosEstrenosFieldRequiredError(): boolean {
    return (
      this.getProximosEstrenosField?.hasError('required')! &&
      (this.getProximosEstrenosField?.dirty ||
        this.getProximosEstrenosField?.touched)!
    );
  }

  get getDirectorField() {
    return this.form.get('director');
  }

  get getDirectorFieldErrors(): boolean {
    return !!(
      this.getDirectorField?.invalid &&
      (this.getDirectorField.dirty || this.getDirectorField.touched)
    );
  }

  get getDirectorFieldRequiredError(): boolean {
    return (
      this.getDirectorField?.hasError('required')! &&
      (this.getDirectorField?.dirty || this.getDirectorField?.touched)!
    );
  }

  get getDirectorFieldFirstLetterUppercaseError(): boolean {
    return (
      this.getDirectorField?.hasError('firstLetterUppercase')! &&
      (this.getDirectorField?.dirty || this.getDirectorField?.touched)!
    );
  }

  get getActoresField() {
    return this.form.get('actores');
  }

  get getActoresFieldErrors(): boolean {
    return !!(
      this.getActoresField?.invalid &&
      (this.getActoresField.dirty || this.getActoresField.touched)
    );
  }

  get getTrailerField() {
    return this.form.get('trailer');
  }

  get getFechaLanzamientoField() {
    return this.form.get('fechaLanzamiento');
  }

  get getFechaLanzamientoFieldErrors(): boolean {
    return !!(
      this.getFechaLanzamientoField?.invalid &&
      (this.getFechaLanzamientoField.dirty ||
        this.getFechaLanzamientoField.touched)
    );
  }

  get getFechaLanzamientoFieldRequiredError(): boolean {
    return (
      this.getFechaLanzamientoField?.hasError('required')! &&
      (this.getFechaLanzamientoField?.dirty ||
        this.getFechaLanzamientoField?.touched)!
    );
  }

  get getFechaLanzamientoFieldDateDoNotFutureError(): boolean {
    return (
      this.getFechaLanzamientoField?.hasError('dateDoNotFuture')! &&
      (this.getFechaLanzamientoField?.dirty ||
        this.getFechaLanzamientoField?.touched)!
    );
  }
}
