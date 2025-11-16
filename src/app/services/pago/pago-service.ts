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
  providedIn: 'root'
})
export class PagoService {
  private http = inject(HttpClient);
  private apiPath = 'http://152.67.46.79:8080';

  getListadoPagos(
    {reservacionId, sesionCajeroId, medioPago, page = 1, size = 10} : 
    {reservacionId?: number, sesionCajeroId?: number, medioPago?: string, page?: number, size?: number} = {}
  ): Observable<PageResponse<Pago>> {

    // consigue el 

    const params = this.buildParams({
      reservacionId, sesionCajeroId, medioPago, page: page - 1, size
    });

    return this.http.get<PageResponse<Pago>>(`${this.apiPath}/api/pagos`, { params });
  }

  getById(paymentId: number): Observable<PagoById> {
    return this.http.get<PagoById>(`${this.apiPath}/api/pagos/${paymentId}`);
  }

  rejectPayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPath}/api/pagos/${paymentId}`);
  }

  getEvidencia(idPago: number) : Observable<Blob> {
    return this.http.get(`${this.apiPath}/api/pagos/evidencia/${idPago}`, { responseType: 'blob' });
  }

  private buildParams(paramsObj: Record<string, any>): HttpParams {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(paramsObj))
      if (value !== null && value !== undefined && value !== '')
        params = params.set(key, value.toString());

    return params;
  }
}
