import { CashierDTO } from "./cajero";

export interface Reservation {
  idReservacion: number;
  usuarioId?: number;
  canchaId: number;
  cajeroId?: number;
  tiempoInicio: string;
  dni: string;
  duracion: string;
  precioTotal: number;
  estadoReservacion: string;
}

export interface ReservationForAdmin {
  idReservacion: number;
  usuarioId?: number;
  canchaId: number;
  cajero?: CashierDTO;
  tiempoInicio: string;
  dni: string;
  duracion: string;
  precioTotal: number;
  saldo: number;
  pagos: number[];
  estadoReservacion: string;
}

export interface ReservationForm {
  canchaId: number;
  tiempoInicio: string;
  dni: string;
  duracion: string;
  montoInicial: number;
  medioPago: string;
}

export interface ReservationResult {
  usuarioId: number;
  canchaId: number;
  dni: string;
  fechaInicio: string;
  duracion: string;
  precioTotal: string;
  estado: string;
  saldo: string;
}
