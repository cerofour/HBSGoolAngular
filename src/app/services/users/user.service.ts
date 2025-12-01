import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../schemas/user';
import { Page } from '../../schemas/page';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private apiURLBASE = 'http://18.222.169.167:8080/api/usuario/';

  getListadoUsers(
    { name, dni, active, page = 0, size = 20, sort = "fatherLastname,asc"} : {name?: string, dni?: string, active?: boolean | string, page?: number, size?: number, sort?: string}
  ): Observable<Page<User>> {
    const params = this.buildParams({name, dni, active, page, size, sort});

    return this.http.get<Page<User>>(this.apiURLBASE, { params });
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
