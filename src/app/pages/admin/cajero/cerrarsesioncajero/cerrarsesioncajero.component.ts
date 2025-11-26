import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { inject, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../../components/button/button';
import { MyInput } from '../../../../components/input/input';
import { AppStateService } from '../../../../services/app-state/app-state';
import { CierreCajeroResponse, SesionCajeroService } from '../../../../services/sesion-cajero/sesion-cajero.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { AuthService } from '../../../../services/auth/auth';
import { Router } from '@angular/router';
import { ReporteCierrePage } from '../../../reporte-cierre-page/reporte-cierre-page';

@Component({
  selector: 'app-cerrar-sesion-cajero',
  standalone: true,
  imports: [CommonModule, Button, MyInput, ReactiveFormsModule, ReporteCierrePage],
  templateUrl: './cerrarsesioncajero.component.html',
})
export class CerrarSesionCajeroComponent {

  private appState = inject(AppStateService);
  private sessionService = inject(SesionCajeroService);
  private toastService = inject(ToastService);

  successfullClosure: boolean = false;
  closureResponse: CierreCajeroResponse = {
    idCierreCajero: 0,
    sesionCajeroId: 0,
    fecha: '',
    montoReal: 0.0,
    montoTeorico: 0.0
  };

  cashierSessionFormGroup = new FormGroup({
    montoReal: new FormControl(0),
  })

  currentCashierSession() {
    return this.appState.getCashierSession()?.sessionId.toString() ?? "0";
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.sessionService.cerrarSesionCajero({
      sesionCajeroId: this.appState.getCashierSession()?.sessionId ?? 0,
      montoReal: this.cashierSessionFormGroup.value.montoReal ?? 0,
      fecha: "",
    }).subscribe({
      next: (response) => {
        this.toastService.success('Cierre de cajero exitoso', 'Se procederá a cerrar sesión de usuario');
        this.successfullClosure = true;
        this.closureResponse = response;
      },
      error: (_) => {
        this.toastService.error("Cierre de cajero fallido", 'Error desconocido');
      }
    })

  }
}