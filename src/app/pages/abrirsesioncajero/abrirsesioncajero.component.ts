import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-abrir-sesion-cajero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abrirsesioncajero.component.html',
  styleUrls: ['./abrirsesioncajero.component.css']
})
export class AbrirSesionCajeroComponent {
  montoInicial: number | null = null;

  open() {
    console.log('Abrir sesión cajero — montoInicial:', this.montoInicial);
  }
}