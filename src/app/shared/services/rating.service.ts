import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService extends BaseHttpService {
  url: string = '';
  constructor() {
    super();
    this.url = `${this.apiUrl}`;
  }

  puntuar(peliculaId: string, puntuacion: number): Observable<void> {
    return this.http.post<void>(`${this.url}/rating`, {
      peliculaId,
      puntuacion,
    });
  }
}
