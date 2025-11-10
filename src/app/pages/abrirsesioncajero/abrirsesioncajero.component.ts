import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/button/button';
import { Modal } from '../../components/modal/modal';
import { SesionCajeroService } from '../../services/sesion-cajero.service';

@Component({
  selector: 'app-abrir-sesion-cajero',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Modal],
  templateUrl: './abrirsesioncajero.component.html',
})
export class AbrirSesionCajeroComponent {
  @ViewChild('modal') modal!: Modal;
  montoInicial: number | null = null;
  blockClose = true;
  private sesionCajeroService = inject(SesionCajeroService);

  // Abre el modal desde el padre (AdminDashboard)
  open() {
    this.blockClose = true;
    this.modal?.open();
  }

  // Envía apertura de sesión de cajero
  abrirSesion() {
    if (this.montoInicial === null || this.montoInicial < 0) {
      return;
    }
    this.sesionCajeroService
      .abrirSesionCajero(this.montoInicial)
      .subscribe({
        next: _ => {
          this.blockClose = false;
          this.modal?.close();
        },
        error: _ => {
          this.blockClose = true;
        },
      });
  }
}

