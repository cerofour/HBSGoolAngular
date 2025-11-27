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

export interface ReservationAsUserResult {
  usuarioId: number;
  canchaId: number;
  dni: string;
  fechaInicio: string;
  duracion: string;
  precioTotal: string;
  estado: string;
  saldo: string;
}

export interface ReservationFormUser {
  canchaId: number;
  tiempoInicio: string;
  dni: string;
  duracion: string;
  montoInicial: number;
  medioPago: string;
}

export interface ReservationAsCashierResult {
  usuarioId: number;
  canchaId: number;
  dni: string;
  fechaInicio: string;
  duracion: string;
  precioTotal: string;
  estado: string;
}

export interface ReservationFormCashier {
  canchaId: number;
  tiempoInicio: string;
  dni: string;
  duracion: string;
  medioPago: string;
}