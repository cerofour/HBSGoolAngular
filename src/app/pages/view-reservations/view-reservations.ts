import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Reservation, ReservationForAdmin, ReservationService } from '../../services/reservation/reservation.service';
import { Button } from '../../components/button/button';
import { AppTable } from '../../components/table/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, AppTable, RouterModule],
  templateUrl: `./view-reservations.html`,
  styleUrl: './view-reservations.css',
})
export class ViewReservations {
  private reservationService = inject(ReservationService);
  reservations: ReservationForAdmin[] = [];

  cargando: boolean = false;
  errorMsg: string | null = null;

  // Filtros
  usuarioId?: number;
  canchaId?: number;
  estado: string = '';
  dni: string = '';

  ngOnInit() {
    this.obtenerListado();
  }

  filtrar(): void {
    this.obtenerListado();
  }

  obtenerListado(): void {
    this.errorMsg = null;
    this.cargando = true;

    const filters = {
      usuarioId: this.usuarioId,
      canchaId: this.canchaId,
      estado: this.estado || undefined,
      dni: this.dni || undefined,
    };

    this.reservationService.getListReservationAdmin(filters).subscribe({
      next: (data) => {
        this.reservations = data.content;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Ocurrió un error al obtener el listado. Intenta nuevamente.';
        this.cargando = false;
      },
    });
  }

  getEstadoClass(estado: string): string {
    const baseClasses = 'inline-block rounded-full px-2 py-1 text-xs font-medium';
    
    switch (estado) {
      case 'CONFIRMADA':
      case 'COMPLETADA':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'POR CONFIRMAR':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'CANCELADA':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }
}