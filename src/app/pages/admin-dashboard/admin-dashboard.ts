import { Component, ViewChild, effect, inject } from '@angular/core'
import { SesionCajeroService } from '../../services/sesion-cajero.service';
import { AppStateService } from '../../services/app-state/app-state';
import { AbrirSesionCajeroComponent } from '../abrirsesioncajero/abrirsesioncajero.component';
import { Reservation, ReservationService } from '../../services/reservation/reservation.service';
import { getDate, getTime } from '../../utils/general-utils';
import { ButtonLink } from '../../components/button-link/button-link';
import { Button } from '../../components/button/button';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [ButtonLink, Button, AbrirSesionCajeroComponent, BreadcrumbsComponent],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboard {
  cashierSessionService = inject(SesionCajeroService);
  private appState = inject(AppStateService);
  private reservationsService = inject(ReservationService);
  private checkedSession = false;
  reservations: Reservation[] = []; 

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
            console.error("No se pudo comprobar la última sesión de caja.")
          }
        });
    }
  });

  ngOnInit() {
    this.reservationsService.getListReservationCashier({estado: 'POR CONFIRMAR', size: 7, sort: 'canchaId'}).subscribe({
      next: data => this.reservations = data.content,
      error: () => {}
    });
  }
  
  getDate = getDate;
  getTime = getTime;
  
}
