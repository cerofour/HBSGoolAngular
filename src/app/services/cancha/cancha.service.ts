import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cancha {
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
  private apiURLBASE = 'http://152.67.46.79:8080/api/cancha';


  getAllCanchas(): Observable<Cancha[]> {
    const headers = this.getHeader();
    return this.http.get<Cancha[]>(`${this.apiURLBASE}`, {headers});
  }

  //ROLE: ADMIN
  patchCancha() {
    //...
  }

    getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbGFjc2FodWFuZ2EuYnVxdWVAZ21haWwuY29tIiwiaWF0IjoxNzYyMzc0NDYyLCJleHAiOjE3NjIzNzgwNjJ9.QQprvVBC3BLf-tXRmwCpaUh_xSlRmdIl8BGGZIv61qw',
      //'Content-Type': 'application/json'
    });
  }

}
