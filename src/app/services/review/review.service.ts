import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../schemas/page';
import { Review } from '../../schemas/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private apiURLBASE = 'http://152.67.46.79:8080/api/reviews';

  /**
   * LISTADO PARA EL COMPONENTE ListadoReviews
   */
  getListadoReviews(
    page: number,
    filtros: {
      usuarioId?: number;
      rating?: number | string;
      fechaDesde?: string;
      fechaHasta?: string;
    }
  ): Observable<Page<Review>> {
    
    const params = this.buildParams({
      page: page - 1,   // Angular usa 1-based, backend usa 0-based
      size: 20,         // el componente usa 20 por página
      sort: 'creado,desc', // opcional, pero recomendado
      ...filtros
    });

    return this.http.get<Page<Review>>(this.apiURLBASE, { params });
  }

  /**
   * OBTENER REVIEW POR ID
   */
  getById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiURLBASE}/${id}`);
  }

  /**
   * CREAR REVIEW
   */
  create(data: {
    rating: number | string;
    comentario: string;
  }): Observable<Review> {
    // Enviar rating tal cual (aceptamos string o number para compatibilidad)
    return this.http.post<Review>(this.apiURLBASE, data);
  }

  /**
   * ACTUALIZAR REVIEW
   */
  update(id: number, data: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${this.apiURLBASE}/${id}`, data);
  }

  /**
   * ELIMINAR REVIEW
   */
  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiURLBASE}/${id}`);
  }

  /**
   * GENERADOR DE QUERY PARAMS (igual que tu ReservationService)
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
