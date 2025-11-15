import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RemotePaymentConfirmation {
  remotePaymentConfirmationId: number;
  paymentId: number;
  cashierId: number;
  date: string;
}

export interface RemotePaymentConfirmationFilters {
  cashierId?: number;
  date?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RemotePaymentConfirmationService {
  // Use the backend server IP during local development / integration testing.
  // The teammate requested to point this service to the remote server host.
  // Keep it without a trailing slash so calls like `${this.apiPath}/api/...` form correct URLs.
  private apiPath = 'http://152.67.46.79:8080';
  private readonly http = inject(HttpClient);

  confirmPayment(paymentId: number): Observable<void> {
    return this.http.post<void>(`${this.apiPath}/api/confirmaciones/${paymentId}/confirmar`, {});
  }

  getConfirmations(filters: RemotePaymentConfirmationFilters = {}): Observable<RemotePaymentConfirmation[]> {
    let params = new HttpParams();

    if (filters.cashierId != null) {
      params = params.set('cashierId', filters.cashierId.toString());
    }
    if (filters.date) {
      params = params.set('date', filters.date);
    }
    if (filters.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params = params.set('endDate', filters.endDate);
    }

      return this.http.get<RemotePaymentConfirmation[]>(`${this.apiPath}/api/confirmaciones`, {
        params,
      });
  }
}
