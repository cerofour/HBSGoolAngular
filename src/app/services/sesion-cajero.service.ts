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


export interface ResumenCaja {
  cajeroId: number;
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
  private apiPath = 'http://152.67.46.79:8080'; 

  cerrarSesionCajero(data: LogoutCashierRequest): Observable<CierreCajeroResponse> {
    return this.http.post<CierreCajeroResponse>(
      `${this.apiPath}/api/cajero/cierrecajero`, 
      data
    );
  }
 
  
  getResumenCajas(cajeroId: number, fechaInicio?: string, fechaFin?: string): Observable<ResumenCaja[]> {
    const params: any = { cajeroId };
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;

    // ruta revisar
    return this.http.get<ResumenCaja[]>(`${this.apiPath}/api/cajero/resumen`, { params });
  }
}