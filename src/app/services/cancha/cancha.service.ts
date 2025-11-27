import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanchaInfo } from '../../schemas/cancha';


@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  private http = inject(HttpClient);
  private apiURLBASE = 'http://152.67.46.79:8080/api/cancha/public';


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

}
