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

  getEvidencia(idPago: number) : Observable<Blob> {
    return this.http.get(`${this.apiPath}/api/pago/evidencia/${idPago}`, { responseType: 'blob' });
  }
}
