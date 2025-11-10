export interface LoginProfileResponse {
  idUsuario: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rol: string;
  dni: string;
  celular: string;
  email: string;
}

export interface AuthResponse {
  jwtToken: string;
  expiracion: string;
}

export interface LoginResponse {
  auth: AuthResponse;
  profile: LoginProfileResponse;
}
