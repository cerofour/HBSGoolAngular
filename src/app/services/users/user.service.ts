import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  userId: number;
  name: string;
  fatherLastname: string;
  motherLastname: string;
  dni: string;
  cellphone: string;
  email: string;
  active: boolean;
  password?: string;
  rol: string;
}

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableInfo {
  sort: SortInfo;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Page<T> {
  content: T[];
  pageable?: PageableInfo;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  sort?: SortInfo;
  numberOfElements?: number;
  size: number;
  number: number;
  empty: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private apiURLBASE = 'http://152.67.46.79:8080/api/usuario/';

  getListadoUsers(
    page: number,
    filtros: {
      name?: string;
      dni?: string;
      active?: boolean | string;
    }
  ): Observable<User[]> {
    const params = this.buildParams({
      page: page - 1,
      size: 20,
      sort: 'creado,desc',
      ...filtros,
    });

    return this.http.get<User[]>(this.apiURLBASE, { params });
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURLBASE}/${id}`);
  }


  createUser(data: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiURLBASE, data);
  }


  updateUser(id: number, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiURLBASE}/${id}`, data);
  }


  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURLBASE}/${id}`);
  }


  toggleEstado(id: number, estado: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiURLBASE}/${id}/estado`, {
      active: estado,
    });
  }


  private buildParams(obj: Record<string, any>): HttpParams {
    let params = new HttpParams();

    for (const [k, v] of Object.entries(obj)) {
      if (v !== null && v !== undefined && v !== '') {
        params = params.set(k, v.toString());
      }
    }

    return params;
  }
}
