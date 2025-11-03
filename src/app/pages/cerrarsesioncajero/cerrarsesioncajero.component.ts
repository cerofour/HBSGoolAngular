import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cerrar-sesion-cajero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cerrarsesioncajero.component.html',
  styleUrls: ['./cerrarsesioncajero.component.css']
})
export class CerrarSesionCajeroComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() logoutOnly = new EventEmitter<void>();
  @Output() confirmClose = new EventEmitter<void>();

  onCancel() {
    console.log('Cancelar cierre sesión');
    this.closed.emit();
  }

  onLogoutOnly() {
    console.log('Solo desloguear');
    this.logoutOnly.emit();
  }

  onConfirmClose() {
    console.log('Confirmar cerrar sesión cajero');
    this.confirmClose.emit();
  }
}