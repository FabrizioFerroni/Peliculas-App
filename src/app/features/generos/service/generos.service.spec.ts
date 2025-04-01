import { TestBed } from '@angular/core/testing';
import { GenerosService } from './generos.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

describe('GenerosService', () => {
  let service: GenerosService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        GenerosService,
      ],
    }).compileComponents();

    service = TestBed.inject(GenerosService);
    httpTesting = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute a GET request to get all the genres', () => {
    // Preparación
    const obtenerTodosSP$ = service.obtenerTodosSP();

    // Probar
    const result = firstValueFrom(obtenerTodosSP$);

    // Validar
    const peticion = httpTesting.expectOne(
      (req) => req.url.endsWith('/generos/todos'),
      'Get all unpaginated genres'
    );

    expect(peticion.request.method).toEqual('GET');
  });
});
