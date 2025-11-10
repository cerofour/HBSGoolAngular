import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequestDTO {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  telefono: string;
  email: string;
  password: string;
  rol: string; 
}

export interface RegisterCashierResult {
  exito: boolean;
  cashierId: number;
  userId: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  telefono: string;
  email: string;
}

export interface CashierSummary {
  idCajero: number;
  idUsuario: number;
  nombreCompleto: string;
  email: string;
  dni: string;
  celular: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CajeroService {
  private http = inject(HttpClient);
  private apiPath = 'http://152.67.46.79:8080'; 

  createCashier(data: RegisterRequestDTO): Observable<RegisterCashierResult> {
    return this.http.post<RegisterCashierResult>(`${this.apiPath}/api/cajero`, data);
  }

  getAllCashier(): Observable<CashierSummary[]> {
    return this.http.get<CashierSummary[]>(`${this.apiPath}/api/cajero`);
  }
}
