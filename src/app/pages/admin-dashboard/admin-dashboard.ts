import { Component } from '@angular/core';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Button],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboard {

canchas = [
    {
      nombre: 'Cancha #1',
      reservaciones: [
        {
          fecha: 'Lunes 15/09',
          hora: '08:00',
          duracion: "60'",
          tipoPago: 'Parcial'
        },
        {
          fecha: 'Lunes 15/09',
          hora: '13:00',
          duracion: "90'",
          tipoPago: 'Completo'
        }
      ]
    },
    {
      nombre: 'Cancha #2',
      reservaciones: [
        {
          fecha: 'Lunes 15/09',
          hora: '20:00',
          duracion: "45'",
          tipoPago: 'Parcial'
        },
        {
          fecha: 'Lunes 15/09',
          hora: '21:00',
          duracion: "90'",
          tipoPago: 'Completo'
        }
      ]
    }
  ];

}
