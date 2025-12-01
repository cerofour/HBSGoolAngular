import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MovimientoBoveda {
  idMovimiento: number;
  usuarioId: number;
  tipoMovimientoBoveda: string;
  motivo: string;
  monto: number;
  fecha?: string;
}

export interface BovedaResponse {
  dineroTotal: number;
  movimientosTotales: number;
  movimientos: MovimientoBoveda[];
}

export interface CreateMovimientoRequest {
  tipoMovimientoBoveda: string;
  motivo: string;
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class BovedaService {
  private http = inject(HttpClient);
  private apiPath = 'http://18.222.169.167:8080';

  getBoveda(): Observable<BovedaResponse> {
    return this.http.get<BovedaResponse>(`${this.apiPath}/api/boveda`);
  }

  createMovimiento(data: CreateMovimientoRequest): Observable<any> {
    return this.http.post(`${this.apiPath}/api/boveda`, data);
  }
}
