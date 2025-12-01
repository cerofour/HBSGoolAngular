import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashierDTO, RegisterCashierResult, RegisterRequestDTO } from '../../schemas/cajero';

@Injectable({
  providedIn: 'root'
})
export class CajeroService {
  private http = inject(HttpClient);
  private apiPath = 'http://18.222.169.167:8080'; 

  createCashier(data: RegisterRequestDTO): Observable<RegisterCashierResult> {
    return this.http.post<RegisterCashierResult>(`${this.apiPath}/api/cajero`, data);
  }

  getAllCashier(): Observable<CashierDTO[]> {
    return this.http.get<CashierDTO[]>(`${this.apiPath}/api/cajero`);
  }
}
