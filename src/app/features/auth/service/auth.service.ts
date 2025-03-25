import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/shared/services/base-http.service';
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
  UsuarioDto,
} from '../dto/auth-dto';
import { Observable, tap } from 'rxjs';
import { PaginacionDto } from '@app/shared/components/modelos/paginacion.dtos';
import { Pageable } from '@app/shared/components/modelos/pageable.dto';
import { HttpResponse } from '@angular/common/http';
import { construirQueryParams } from '@app/shared/functions/construirQueryParams';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  url: string = '';
  url_api: string = '';
  private readonly llaveToken = 'token';
  private readonly llaveTokenExpiracion = 'token_expiracion';
  constructor() {
    super();
    this.url = `${this.authUrl}`;
    this.url_api = `${this.apiUrl}/usuarios`;
  }

  obtenerUsuarioPaginado(
    paginado: PaginacionDto
  ): Observable<HttpResponse<Pageable<UsuarioDto[]>>> {
    let params = construirQueryParams(paginado);
    return this.http.get<Pageable<UsuarioDto[]>>(`${this.url_api}`, {
      params,
      observe: 'response',
    });
  }

  hacerAdmin(email: string): Observable<void> {
    return this.http.post<void>(`${this.url_api}/add-rol`, { email });
  }

  removerAdmin(email: string): Observable<void> {
    return this.http.post<void>(`${this.url_api}/delete-rol`, { email });
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.llaveToken);
  }

  register(body: RegisterDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.url}/register`, body)
      .pipe(tap((respuesta) => this.guardarToken(respuesta)));
  }

  login(body: LoginDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.url}/login`, body)
      .pipe(tap((respuesta) => this.guardarToken(respuesta)));
  }

  guardarToken(respuesta: AuthResponse) {
    localStorage.setItem(this.llaveToken, respuesta.token);
    localStorage.setItem(
      this.llaveTokenExpiracion,
      respuesta.tokenExpiry.toString()
    );
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) return '';
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const payloadJson = JSON.parse(payloadDecoded);
    return payloadJson[campo];
  }

  isLogged(): boolean {
    const token = localStorage.getItem(this.llaveToken);

    if (!token) return false;

    const tokenExpiracion = new Date(
      localStorage.getItem(this.llaveTokenExpiracion)!
    );

    if (tokenExpiracion <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveTokenExpiracion);
  }

  obtainRole(): string {
    const esAdmin = this.obtenerCampoJWT('esadmin');
    return esAdmin === 'true' ? 'admin' : '';
  }
}
