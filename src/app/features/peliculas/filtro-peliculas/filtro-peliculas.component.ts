import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ListadoPeliculasComponent } from '../listado-peliculas/listado-peliculas.component';
import { IFiltroPelicula } from './interface/filtro-pelicula';
import { Location } from '@angular/common';
import { Rutas } from '@app/shared/utils/rutas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  standalone: true,
  imports: [ReactiveFormsModule, ListadoPeliculasComponent],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.scss',
})
export default class FiltroPeliculasComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private location: Location = inject(Location);
  private readonly thisPage = Rutas.PELICULA_FILTROS;
  private activatedRoute = inject(ActivatedRoute);
  form = this.fb.group({
    titulo: '',
    anio: '',
    generoId: '',
    proximosEstrenos: false,
    enCines: false,
  });

  generos = [
    // id string ( guid ), nombre string
    { id: 'ae8c3c90-51e2-4e0b-8420-7dd5627e241b', nombre: 'Acción' },
    { id: '77396998-36da-4266-976e-26830d48248a', nombre: 'Drama' },
    { id: '5e1980a9-bcac-4344-bf35-9a8b344aedea', nombre: 'Comedia' },
    { id: 'be8fb6b4-6685-443e-a566-efd54abce753', nombre: 'Aventura' },
    { id: 'd2357e30-9706-47ba-907a-c9766ed1df7c', nombre: 'Terror' },
  ];

  peliculasOriginal = [
    {
      titulo: 'Inside Out 2',
      fechaLanzamiento: new Date(),
      precio: 1400.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832',
      generos: 'ae8c3c90-51e2-4e0b-8420-7dd5627e241b',
      enCines: false,
      proximosEstrenos: false,
    },
    {
      titulo: 'Moana 2',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg',
      generos: '77396998-36da-4266-976e-26830d48248a',
      enCines: true,
      proximosEstrenos: true,
    },
    {
      titulo: 'Bad Boys: Ride or Die',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/8/8b/Bad_Boys_Ride_or_Die_%282024%29_poster.jpg',
      generos: '5e1980a9-bcac-4344-bf35-9a8b344aedea',
      enCines: false,
      proximosEstrenos: false,
    },
    {
      titulo: 'Deadpool & Wolverine',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Deadpool_%26_Wolverine_poster.jpg/220px-Deadpool_%26_Wolverine_poster.jpg',
      generos: 'be8fb6b4-6685-443e-a566-efd54abce753',
      enCines: true,
      proximosEstrenos: true,
    },
    {
      titulo: 'Oppenheimer',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg',
      generos: 'd2357e30-9706-47ba-907a-c9766ed1df7c',
      enCines: false,
      proximosEstrenos: false,
    },
    {
      titulo: 'The Flash',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/The_Flash_%28film%29_poster.jpg/220px-The_Flash_%28film%29_poster.jpg',
      generos: 'ae8c3c90-51e2-4e0b-8420-7dd5627e241b',
      enCines: true,
      proximosEstrenos: true,
    },
  ];

  peliculas = this.peliculasOriginal;

  ngOnInit(): void {
    this.leerValoresUrl();
    this.buscarPeliculas(this.form.value as IFiltroPelicula);
    this.form.valueChanges.subscribe((filtro) => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(filtro as IFiltroPelicula);
      this.escribirParametrosDeBusqueda(filtro as IFiltroPelicula);
    });
  }

  limpiar() {
    this.form.patchValue({
      titulo: '',
      anio: '',
      generoId: '',
      proximosEstrenos: false,
      enCines: false,
    });
  }

  buscarPeliculas(filtro: IFiltroPelicula) {
    if (filtro.titulo) {
      this.peliculas = this.peliculas.filter(
        (pelicula) =>
          pelicula.titulo.toLowerCase().indexOf(filtro.titulo.toLowerCase()) !==
          -1
      );
    }

    if (
      filtro.generoId !== null ||
      filtro.generoId !== undefined ||
      filtro.generoId !== ''
    ) {
      this.peliculas = this.peliculas.filter(
        (pelicula) =>
          pelicula.generos.toLowerCase().indexOf(filtro.generoId) !== -1
      );
    }

    if (filtro.proximosEstrenos) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.proximosEstrenos
      );
    }

    if (filtro.enCines) {
      this.peliculas = this.peliculas.filter((pelicula) => pelicula.enCines);
    }
  }

  escribirParametrosDeBusqueda(filtro: IFiltroPelicula) {
    let queryString = [];

    if (filtro.titulo) {
      queryString.push(`titulo=${encodeURIComponent(filtro.titulo)}`);
    }

    if (filtro.generoId !== '') {
      queryString.push(`generoId=${encodeURIComponent(filtro.generoId)}`);
    }

    if (filtro.proximosEstrenos) {
      queryString.push(`proximosEstrenos=${filtro.proximosEstrenos}`);
    }

    if (filtro.enCines) {
      queryString.push(`enCines=${filtro.enCines}`);
    }

    this.location.replaceState(this.thisPage, queryString.join('&'));
  }

  leerValoresUrl() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const filtro = {
        titulo: '',
        anio: '',
        generoId: '',
        proximosEstrenos: false,
        enCines: false,
      };

      if (params['titulo']) {
        filtro.titulo = decodeURIComponent(params['titulo']);
      }

      if (params['generoId']) {
        filtro.generoId = decodeURIComponent(params['generoId']);
      }

      if (params['proximosEstrenos']) {
        filtro.proximosEstrenos = params['proximosEstrenos'] === 'true';
      }

      if (params['enCines']) {
        filtro.enCines = params['enCines'] === 'true';
      }

      this.form.patchValue(filtro);
    });
  }
}
