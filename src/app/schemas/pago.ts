import { SesionCajeroDTO } from "../services/sesion-cajero/sesion-cajero-dto";

export interface Pago {
  idPago: number;
  reservacionId: number | null;
  sesionCajeroId: number | null;
  cantidadDinero: number;
  fecha: string; // ISO string
  medioPago: string;
  estadoPago: string;
  evidencia: string | null;
}

export interface PagoById {
  idPago: number;
  reservacionId: number | null;
  sesionCajero: SesionCajeroDTO;
  cantidadDinero: number;
  fecha: string; // ISO string
  medioPago: string;
  estadoPago: string;
  evidencia: string | null;
}