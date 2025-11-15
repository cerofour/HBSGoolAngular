import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getListadoPagos(page: number = 1): Observable<PageResponse<Pago>> {

    // consigue el 
    return this.http.get<PageResponse<Pago>>(`${this.apiPath}/api/pagos?size=20&page=${page - 1}`);
  }

  /**
   * Obtiene los pagos asociados a una sesión de cajero específica usando paginación.
   */
  getPagosPorSesion(
    sesionCajeroId: number,
    page: number = 1,
    size: number = 20,
  ): Observable<PageResponse<Pago>> {
    const pageIndex = Math.max(page - 1, 0);
    const url = `${this.apiPath}/api/pagos?sesionCajeroId=${sesionCajeroId}&size=${size}&page=${pageIndex}`;
    return this.http.get<PageResponse<Pago>>(url);
  }

  rejectPayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPath}/api/pagos/${paymentId}`);
  }

  getEvidencia(idPago: number) : Observable<Blob> {
    return this.http.get(`${this.apiPath}/api/pagos/evidencia/${idPago}`, { responseType: 'blob' });
  }
}
