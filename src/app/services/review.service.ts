import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReviewDto {
  idReview: number;
  usuarioId: number;
  rating: string;
  comentario: string;
  creado: string; // ISO-8601
}

export interface Page<T> {
  content: T[];
  pageable?: any;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly baseUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene una página de reviews. Todos los parámetros son opcionales.
   */
  getReviews(options?: {
    usuarioId?: number;
    page?: number;
    size?: number;
    sort?: string; // formato: campo,dir (ej: creado,desc)
  }): Observable<Page<ReviewDto>> {
    let params = new HttpParams();
    if (options) {
      if (options.usuarioId != null) params = params.set('usuarioId', String(options.usuarioId));
      if (options.page != null) params = params.set('page', String(options.page));
      if (options.size != null) params = params.set('size', String(options.size));
      if (options.sort) params = params.set('sort', options.sort);
    }
    return this.http.get<Page<ReviewDto>>(this.baseUrl, { params });
  }

  /**
   * Obtiene un review por id.
   */
  getReviewById(id: number): Observable<ReviewDto> {
    return this.http.get<ReviewDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * Envía una nueva opinión (POST). Devuelve el ReviewDto creado (201 en backend).
   */
  postReview(payload: { usuarioId: number; rating: string; comentario: string }): Observable<ReviewDto> {
    return this.http.post<ReviewDto>(this.baseUrl, payload);
  }
}
