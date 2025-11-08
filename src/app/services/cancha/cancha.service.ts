import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CanchaInfo {
  canchaId: number;
  name: string;
  description: string;
  hourlyPrice: number;
  canchaState: string;
}

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  private http = inject(HttpClient);
  private apiURLBASE = 'http://152.67.46.79:8080/api/cancha/public';


  getAllCanchas(): Observable<CanchaInfo[]> {
    return this.http.get<CanchaInfo[]>(`${this.apiURLBASE}`);
  }

  //ROLE: ADMIN
  patchCancha() {
    //...
  }

}
