import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../schemas/page';
import { Reservation, ReservationForAdmin, ReservationForm, ReservationResult } from '../../schemas/reservation';

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
    {usuarioId, canchaId, estado, dni, page = 0, size = 50, sort = "tiempoInicio"} : 
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
  creationReservationAsUser(data: ReservationForm, file: File): Observable<ReservationResult> {
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json'}));
    formData.append('evidencia', file, file.name);

    return this.http.post<ReservationResult>(`${this.apiURLBASE}`, formData);

  }

  //ROLE: ADMIN OR CASHIER
  creationReservationAsCashier(data: ReservationForm, file: File | null): Observable<ReservationResult> {
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json'}));
    formData.append('evidencia', file ?? new Blob([]), file === null ? '' : file.name);

    return this.http.post<ReservationResult>(`${this.apiURLBASE}/cajero`, formData);

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
