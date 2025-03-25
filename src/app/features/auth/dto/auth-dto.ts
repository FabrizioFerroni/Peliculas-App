export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  tokenExpiry: Date;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface UsuarioDto {
  id: string;
  email: string;
  username: string;
}
