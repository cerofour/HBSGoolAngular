import { Component, ViewChild, effect, inject } from '@angular/core';

import { Button } from '../../components/button/button';

import { SesionCajeroService } from '../../services/sesion-cajero.service';
import { AppStateService } from '../../services/app-state/app-state';
import { AbrirSesionCajeroComponent } from '../abrirsesioncajero/abrirsesioncajero.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Button, AbrirSesionCajeroComponent],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboard {
  cashierSessionService = inject(SesionCajeroService);
  private appState = inject(AppStateService);
  private checkedSession = false;

  @ViewChild('openSessionModal') openSessionModal!: AbrirSesionCajeroComponent;

  // Ejecutar en contexto de inyección usando inicializador de campo
  private profileEffect = effect(() => {
    const profile = this.appState.userProfileSignal()();
    if (profile && !this.checkedSession) {
      this.checkedSession = true;
      this.cashierSessionService.getLastCashierSession()
        .subscribe({
          next: res => {
            if (res.abierta === false) {
              this.openSessionModal.open();
            }
          },
          error: _ => {
            // si falla, dejamos el modal cerrado; se puede reintentar manualmente si aplica
          }
        });
    }
  });

  ngOnInit() {}

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
