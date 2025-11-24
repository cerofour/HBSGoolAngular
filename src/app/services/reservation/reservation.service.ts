import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashierDTO } from '../cajero-service/cajero.service';

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

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableInfo {
  sort: SortInfo;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Page<T> {
  content: T[];
  pageable?: PageableInfo;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  sort?: SortInfo;
  numberOfElements?: number;
  size: number;
  number: number;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient);
  private apiURLBASE = 'http://152.67.46.79:8080/api/reservaciones'

  //ROLE: USER
  getRerservationsUser(
    {page = 0, size = 10, sort = "tiempoInicio"}: {page?: number, size?: number, sort?: string} = {}
  ): Observable<Page<Reservation>> {

    const params = this.buildParams({page, size, sort});
    return this.http.get<Page<Reservation>>(`${this.apiURLBASE}/usuario`, { params });
  }

  //ROLE: ADMIN OR CASHIER
  getListReservationCashier(
    {usuarioId, canchaId, estado, dni, page = 0, size = 10, sort = "tiempoInicio"} : 
    {usuarioId?: number, canchaId?: number, estado?: string | string[], dni?: string, page?: number, size?: number, sort?: string} = {}
  ): Observable<Page<Reservation>> {
    const params = this.buildParams({usuarioId, canchaId, estado, dni, page, size, sort});
    return this.http.get<Page<Reservation>>(`${this.apiURLBASE}`, { params });

  }

  //ROLE: ADMIN OR CASHIER
  getListReservationAdmin(
    {usuarioId, canchaId, estado, dni, page = 0, size = 10, sort = "tiempoInicio"} : 
    {usuarioId?: number, canchaId?: number, estado?: string | string[], dni?: string, page?: number, size?: number, sort?: string} = {}
  ): Observable<Page<ReservationForAdmin>> {
    const params = this.buildParams({usuarioId, canchaId, estado, dni, page, size, sort});
    return this.http.get<Page<ReservationForAdmin>>(`${this.apiURLBASE}/admin`, { params });

  }

  //ROLE: ADMIN OR CASHIER
  getByIdReservationCashier(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiURLBASE}/${id}`);
  }

  //ROLE: USER
  creationReservationAsUser(data: ReservationFormUser, file: File): Observable<ReservationAsUserResult> {
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json'}));
    formData.append('evidencia', file, file.name);

    return this.http.post<ReservationAsUserResult>(`${this.apiURLBASE}`, formData);

  }

  //ROLE: ADMIN OR CASHIER
  creationReservationAsCashier(data: ReservationFormCashier, file: File | null): Observable<ReservationAsCashierResult> {
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json'}));
    formData.append('evidencia', file ?? new Blob([]), file === null ? '' : file.name);

    return this.http.post<ReservationAsCashierResult>(`${this.apiURLBASE}/cajero`, formData);

  }

  //ROLE: ADMIN OR CASHIER
  cancelReservationCashier(id: number): Observable<null> {
    return this.http.patch<null>(`${this.apiURLBASE}/${id}/cancelar`, {  });
  }

  private buildParams(paramsObj: Record<string, any>): HttpParams {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(paramsObj)) {
      if (value === null || value === undefined || value === '') {
        continue;
      }

      if (Array.isArray(value)) {
        value
          .filter(item => item !== null && item !== undefined && item !== '')
          .forEach(item => {
            params = params.append(key, item.toString());
          });
      } else {
        params = params.set(key, value.toString());
      }
    }

    return params;
  }
  
}
