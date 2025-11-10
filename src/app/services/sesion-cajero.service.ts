import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LastCashierSession } from './sesion-cajero/last-session';
import { AppStateService } from './app-state/app-state';


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


export interface ResumenCaja {
  idCajero: number;
  idSesionCajero: number;
  fechaApertura: string;
  fechaCierre?: string | null;
  montoInicial: number;
  montoTeorico: number;
  montoReal: number;
}

@Injectable({
  providedIn: 'root'
})
export class SesionCajeroService {

  private http = inject(HttpClient);
  private appState = inject(AppStateService);
  private apiPath = 'http://152.67.46.79:8080'; 

  cerrarSesionCajero(data: LogoutCashierRequest): Observable<CierreCajeroResponse> {
    return this.http.post<CierreCajeroResponse>(
      `${this.apiPath}/api/cierre_cajero/`, 
      data
    );
  }
 
  getLastCashierSession():Observable<LastCashierSession> {
    return this.http.get<LastCashierSession>(
      `${this.apiPath}/api/sesion_cajero/ultima?usuarioId=${this.appState.getUserProfile()?.idUsuario}`
    )
  }
  
  getResumenCajas(idCajero: number, fechaInicio?: string, fechaFin?: string): Observable<ResumenCaja[]> {
    const params: any = { idCajero };
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;

    // ruta revisar
    return this.http.get<ResumenCaja[]>(`${this.apiPath}/api/sesion_cajero/resumen`, { params } );
  }
}