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

export interface LoginResponse {
  auth: {
    jwtToken: string;
    expiracion: string;
  };
  profile: LoginProfileResponse;
}
