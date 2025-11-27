import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, share, tap } from 'rxjs';
import { LastCashierSession } from './last-session';
import { AppStateService } from '../app-state/app-state';
import { AbrirSesionCajeroResponse } from './abrir-sesion-response';
import { buildParams } from '../pago/pago-service';
import { Page } from '../../schemas/page';
import { Pago } from '../../schemas/pago';
import { CashierDTO } from '../../schemas/cajero';

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
  idSesionCajero: number;
  cajero: CashierDTO;
  fechaApertura: string;
  fechaCierre?: string | null;
  montoInicial: number;
  montoTeorico: number;
  montoReal: number;
}

@Injectable({
  providedIn: 'root',
})
export class SesionCajeroService {
  private http = inject(HttpClient);
  private appState = inject(AppStateService);
  private apiPath = 'http://152.67.46.79:8080';

  cerrarSesionCajero(data: LogoutCashierRequest): Observable<CierreCajeroResponse> {
    return this.http.post<CierreCajeroResponse>(`${this.apiPath}/api/cierre_cajero/`, data);
  }

  getLastCashierSession(): Observable<LastCashierSession> {
    console.log('Perfil de usuario en getlastcashiersession: ' + this.appState.getUserProfile());

    return this.http
      .get<LastCashierSession>(
        `${this.apiPath}/api/sesion_cajero/ultima?usuarioId=${this.appState.getUserProfile()?.idUsuario
        }`
      )
      .pipe(
        tap((x) =>
          this.appState.updateCashierSession({
            sessionId: x.idSesion,
            initialMoneyAmount: x.montoApertura,
            openingDate: x.fechaApertura,
          })
        )
      );
  }

  getResumenCajas(
    { idCajero, fechaInicio, fechaFin, page = 0, size = 10, sort = "fechaApertura" }: 
    { idCajero: number, fechaInicio?: string, fechaFin?: string, page?: number, size?: number, sort?: string }): Observable<Page<ResumenCaja>> {
    const params: any = { idCajero };
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;
    params.page = page;
    params.size = size;
    params.sort = sort;

    // ruta revisar
    return this.http.get<Page<ResumenCaja>>(`${this.apiPath}/api/sesion_cajero/resumen`, { params });
  }

  abrirSesionCajero(montoInicial: number): Observable<AbrirSesionCajeroResponse> {
    console.log(montoInicial);

    return this.http
      .post<any>(`${this.apiPath}/api/sesion_cajero`, { initialMoney: montoInicial })
      .pipe(
        share(),
        tap((res) => {
          this.saveSessionId(res);
        })
      );
  }

  getAllTransactions({
    sessionId,
    page = 1,
    size = 20,
  }: {
    sessionId: number;
    page?: number;
    size?: number;
  }): Observable<Page<Pago>> {

    let params = buildParams({
      page: page - 1, size
    })

    return this.http.get<Page<Pago>>(`${this.apiPath}/api/sesion_cajero/${sessionId}/transaccion`, { params });
  }

  saveSessionId(res: AbrirSesionCajeroResponse) {
    this.appState.updateCashierSession({
      initialMoneyAmount: res.montoInicial,
      sessionId: res.idSesionCajero,
      openingDate: res.fechaApertura,
    });
  }
}
