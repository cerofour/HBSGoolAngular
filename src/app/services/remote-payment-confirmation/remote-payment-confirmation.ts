import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../schemas/page';
import { RemotePaymentConfirmation, RemotePaymentConfirmationFilters } from '../../schemas/remote-payment-confirmation';

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
    return this.http.post<void>(`${this.apiPath}/api/confirmaciones/pago/${paymentId}/confirmar`, {});
  }

  getByPaymentId(paymentId: number) {
    return this.http.get<RemotePaymentConfirmation[]>(`${this.apiPath}/api/confirmaciones/pago/${paymentId}`);
  }

  getById(confirmationId: number) {
    return this.http.get<RemotePaymentConfirmation[]>(`${this.apiPath}/api/confirmaciones/${confirmationId}`);
  }

  /**
   * Obtiene confirmaciones de pago remoto con filtros y paginación.
   * Sigue el patrón de Page<T> usado en otros servicios (reviews, reservations).
   */
  getConfirmations({
    cashierId,
    date,
    startDate,
    endDate,
    page = 0,
    size = 20,
    sort = 'date'
  }: RemotePaymentConfirmationFilters & { page?: number; size?: number; sort?: string } = {}): Observable<Page<RemotePaymentConfirmation>> {
    const params = this.buildParams({
      cashierId,
      date,
      startDate,
      endDate,
      page,
      size,
      sort,
    });

    return this.http.get<Page<RemotePaymentConfirmation>>(`${this.apiPath}/api/confirmaciones`, { params });
  }

  /**
   * Construye HttpParams ignorando valores null/undefined/''.
   */
  private buildParams(paramsObj: Record<string, any>): HttpParams {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(paramsObj)) {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    }

    return params;
  }
}
