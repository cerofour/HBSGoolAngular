import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface LogoutCashierRequest {
  sesionCajeroId: number;
  fecha: string;       
  montoReal: number;
}


export interface CierreCajeroResponse {
  idCierreCajero: number;
  sesionCajeroId: number;
  fecha: string;
  montoTeorico: number;
  montoReal: number;
}

@Injectable({
  providedIn: 'root'
})
export class SesionCajeroService {

  private http = inject(HttpClient);
  private apiPath = 'http://152.67.46.79:8080'; 

  cerrarSesionCajero(data: LogoutCashierRequest): Observable<CierreCajeroResponse> {
    return this.http.post<CierreCajeroResponse>(
      `${this.apiPath}/api/cajero/cierrecajero`, 
      data
    );
  }
}