
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-abrir-sesion-cajero',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './abrirsesioncajero.component.html',
})
export class AbrirSesionCajeroComponent {
  montoInicial: number | null = null;

  open() {
    console.log('Abrir sesión cajero — montoInicial:', this.montoInicial);
  }
}