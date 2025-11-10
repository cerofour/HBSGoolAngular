
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/button/button';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-abrir-sesion-cajero',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Modal],
  templateUrl: './abrirsesioncajero.component.html',
})
export class AbrirSesionCajeroComponent implements AfterViewInit {
  @ViewChild('modal') modal!: Modal;
  montoInicial: number | null = null;

  ngAfterViewInit() {
    // Abrir el modal automáticamente al cargar el componente
    this.modal?.open();
  }

  open() {
    console.log('Abrir sesión cajero — montoInicial:', this.montoInicial);
    // Cerrar el modal después de abrir la sesión
    this.modal?.close();
  }
}