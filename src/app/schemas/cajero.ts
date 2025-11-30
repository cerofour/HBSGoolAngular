export interface RegisterRequestDTO {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  telefono: string;
  email: string;
  password: string;
  rol: string; 
}

export interface RegisterCashierResult {
  exito: boolean;
  cashierId: number;
  userId: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  telefono: string;
  email: string;
}

export interface CashierDTO {
  idCajero: number;
  idUsuario: number;
  nombreCompleto: string;
  email: string;
  dni: string;
  celular: string;
  activo: boolean;
}