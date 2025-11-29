import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CanchaInfo } from '../../schemas/cancha';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  private http = inject(HttpClient);
  private apiURLBASE = 'http://152.67.46.79:8080/api/cancha/public';
  // Base para operaciones administrativas (update/patch) - endpoint correcto según backend
  private apiAdminBase = 'http://152.67.46.79:8080/api/cancha';
  
  // Subject para notificar a la UI cuando las canchas cambian (p. ej. después de un PATCH)
  private _refresh$ = new Subject<void>();
  public readonly refresh$ = this._refresh$.asObservable();


  getAllCanchas(): Observable<CanchaInfo[]> {
    return this.http.get<CanchaInfo[]>(`${this.apiURLBASE}`);
  }

  getCanchaById(id: number): Observable<CanchaInfo> {
    return this.http.get<CanchaInfo>(`${this.apiURLBASE}/${id}`)
  }

  //ROLE: ADMIN
  patchCancha() {
    //...
  }
  
  /** Compatibilidad: método en español usado por componentes antiguos */
  obtenerCanchaPorId(id: number): Observable<CanchaInfo> {
    return this.getCanchaById(id);
  }

  /** Actualiza una cancha (PUT). Devuelve el Observable de la petición. */
  /** Actualiza una cancha (PATCH) hacia /api/cancha/{id} según especificación del backend. */
  actualizarCancha(id: number, payload: Partial<CanchaInfo>): Observable<any> {
    return this.http.patch(`${this.apiAdminBase}/${id}`, payload).pipe(
      tap(() => {
        // emitir notificación para que componentes que muestren listas recarguen
        this._refresh$.next();
      })
    );
  }

}
