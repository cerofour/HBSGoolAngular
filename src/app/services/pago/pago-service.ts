import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { SesionCajeroDTO } from '../sesion-cajero/sesion-cajero-dto';

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

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private http = inject(HttpClient);
  private apiPath = 'http://152.67.46.79:8080';

  getListadoPagos({
    reservacionId,
    sesionCajeroId,
    medioPago,
    page = 1,
    size = 10,
  }: {
    reservacionId?: number;
    sesionCajeroId?: number;
    medioPago?: string;
    page?: number;
    size?: number;
  } = {}): Observable<PageResponse<Pago>> {
    // consigue el

    const params = buildParams({
      reservacionId,
      sesionCajeroId,
      medioPago,
      page: page - 1,
      size,
    });

    return this.http.get<PageResponse<Pago>>(`${this.apiPath}/api/pagos`, { params });
  }

  getById(paymentId: number): Observable<PagoById> {
    return this.http.get<PagoById>(`${this.apiPath}/api/pagos/${paymentId}`);
  }

  /**
   * Obtiene los pagos asociados a una sesión de cajero específica usando paginación.
   */
  getPagosPorSesion(
    sesionCajeroId: number,
    page: number = 1,
    size: number = 20
  ): Observable<PageResponse<Pago>> {
    const pageIndex = Math.max(page - 1, 0);
    const url = `${this.apiPath}/api/pagos?sesionCajeroId=${sesionCajeroId}&size=${size}&page=${pageIndex}`;
    return this.http.get<PageResponse<Pago>>(url);
  }

  rejectPayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPath}/api/pagos/${paymentId}`);
  }

  getEvidencia(idPago: number): Observable<Blob> {
    return this.http.get(`${this.apiPath}/api/pagos/evidencia/${idPago}`, { responseType: 'blob' });
  }

  createPaymentForReservation(
    reservationId: number,
    payload: { cantidadDinero: number; sesionCajeroId: number; medioPago: string; evidencia?: File | null }
  ): Observable<Pago> {
    const formData = new FormData();
    formData.append('cantidadDinero', payload.cantidadDinero.toString());
    formData.append('sesionCajeroId', payload.sesionCajeroId.toString());
    formData.append('medioPago', payload.medioPago);

    if (payload.evidencia) {
      formData.append('evidencia', payload.evidencia, payload.evidencia.name);
    }

    return this.http.post<Pago>(`${this.apiPath}/api/pagos/reservacion/${reservationId}`, formData);
  }
}

export function buildParams(paramsObj: Record<string, any>): HttpParams {
  let params = new HttpParams();

  for (const [key, value] of Object.entries(paramsObj))
    if (value !== null && value !== undefined && value !== '')
      params = params.set(key, value.toString());

  return params;
}
