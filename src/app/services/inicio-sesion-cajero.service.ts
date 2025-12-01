import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateCashierSessionRequest {
  initialMoney: number;  
}


export interface SesionCajeroResponse {
  idSesionCajero: number;
  montoInicial: number;
  fechaApertura: string;
}

@Injectable({
  providedIn: 'root'
})
export class InicioSesionCajeroService {

  private http = inject(HttpClient);
  private apiPath = 'http://18.222.169.167:8080';

  iniciarSesionCajero(data: CreateCashierSessionRequest): Observable<SesionCajeroResponse> {
    return this.http.post<SesionCajeroResponse>(
      `${this.apiPath}/api/sesion_cajero`,
      data
    );
  }
}
