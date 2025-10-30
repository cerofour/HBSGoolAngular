import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Reservation {
  idReservation: number;
  userId?: number;
  canchaId: number;
  cashierId?: number;
  startTime: Date;
  dni: string;
  duration: string;
  totalPrice: number;
  reservationStatus: string;
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
    const headers = this.getHeader();
    return this.http.get<Page<Reservation>>(`${this.apiURLBASE}/usuario`, { headers, params });
  }

  //ROLE: ADMIN OR CASHIER
  getListReservationCashier(
    {usuarioId, canchaId, estado, dni, page = 0, size = 10, sort = "tiempoInicio"} : 
    {usuarioId?: number, canchaId?: number, estado?: string, dni?: string, page?: number, size?: number, sort?: string} = {}
  ): Observable<Page<Reservation>> {

    const params = this.buildParams({usuarioId, canchaId, estado, dni, page, size, sort});
    const headers = this.getHeader();
    return this.http.get<Page<Reservation>>(`${this.apiURLBASE}`, { headers, params });

  }

  //ROLE: ADMIN OR CASHIER
  getByIdReservationCashier(id: number): Observable<Reservation> {
    const headers = this.getHeader();
    return this.http.get<Reservation>(`${this.apiURLBASE}/${id}`, { headers });
  }

  //ROLE: USER
  creationReservationAsUser(data: ReservationFormUser, file: File): Observable<ReservationAsUserResult> {

    const headers = this.getHeader();
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json'}));
    formData.append('evidencia', file, file.name);

    return this.http.post<ReservationAsUserResult>(`${this.apiURLBASE}`, formData, { headers });

  }

  //ROLE: ADMIN OR CASHIER
  creationReservationAsCashier(data: ReservationFormCashier, file: File): Observable<ReservationAsCashierResult> {
    const headers = this.getHeader();
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json'}));
    formData.append('evidencia', file, file.name);

    return this.http.post<ReservationAsCashierResult>(`${this.apiURLBASE}/cajero`, formData, { headers });

  }

  //ROLE: ADMIN OR CASHIER
  cancelReservationCashier(id: number): Observable<null> {
    const headers = this.getHeader();
    return this.http.patch<null>(`${this.apiURLBASE}/${id}/cancelar`, { headers });
  }

  private buildParams(paramsObj: Record<string, any>): HttpParams {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(paramsObj))
      if (value !== null && value !== undefined && value !== '')
        params = params.set(key, value.toString());

    return params;
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbGFjc2FodWFuZ2EuYnVxdWVAZ21haWwuY29tIiwiaWF0IjoxNzYxNDY5NDg2LCJleHAiOjE3NjE0NzMwODZ9.I38FhQmzvCpdNN-3A7COmRjH8MLtLv3WYWzA6zMxKhI',
      //'Content-Type': 'application/json'
    });
  }
  
}
