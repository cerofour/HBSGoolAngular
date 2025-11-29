import { Component, computed, input } from '@angular/core';
import { Badge } from '../../badge/badge';
import { Reservation } from '../../../schemas/reservation';
import { calculateEndTime } from '../../../utils/general-utils';

@Component({
  selector: 'app-reservation-card-user',
  imports: [Badge],
  template: `
    <div class="p-4 w-full border border-gray-100 shadow rounded-2xl bg-white">
      <!-- Header: Cancha y Estado -->
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <i class="ph ph-soccer-ball"></i>
          <span class="text-gray-800 font-medium">Cancha: {{ reservation().canchaId }}</span>
        </div>
        <app-badge [variant]="getBadgeVariant()" [label]="getEstadoLabel()"></app-badge>
      </div>

      <!-- Fecha -->
      <div class="">
        <p class="font-bold text-gray-900">
          
        <i class="ph ph-calendar"></i>
        {{ formattedDate }}</p>
      </div>

      <!-- Hora y Duración -->
      <div class="mb-2 text-gray-800">
        <p>
          
        <i class="ph ph-clock"></i>
        {{ formattedTimeRange }} ({{ formattedDuration }})</p>
      </div>

      <!-- Detalles -->
      <div class="space-y-2 mb-2">
        <div class="text-sm text-gray-700">
          <span class="font-bold">Reserva ID:</span> {{ formatReservationId(reservation().idReservacion) }}
        </div>
        <div class="text-sm text-gray-700">
          <span class="font-bold">DNI:</span> {{ reservation().dni }}
        </div>
      </div>

      <!-- Total -->
      <div class="pt-2 border-t border-gray-200">
        <div class="text-sm text-gray-700">
          <span class="font-bold">Total:</span> 
          <span class="font-semibold text-gray-900 ml-2">{{ formattedPrice }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './reservation-card-user.css',
})
export class ReservationCardUser {

  reservation = input.required<Reservation>();

  // Formatea la fecha en formato 'DIA, dd/mm/yyyy'
  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  }

  // Formatea la hora en formato 12 horas (AM/PM)
  getTime12Hour(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  // Calcula el rango de horas (inicio - fin)
  getTimeRange(): string {
    const startTime = this.getTime12Hour(this.reservation().tiempoInicio);
    const endDate = calculateEndTime(this.reservation().tiempoInicio, this.reservation().duracion);
    const endTime = this.getTime12Hour(endDate.toISOString());
    return `${startTime}`;
  }

  // Formatea la duración
  getFormattedDuration(): string {
    const duration = this.reservation().duracion.trim().toLowerCase();
    const regex = /(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*minutes?)?/;
    const match = duration.match(regex);
    
    if (!match) return this.reservation().duracion;
    
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    
    if (hours > 0 && minutes > 0) {
      return `${hours} hr ${minutes} min`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hr' : `${hours} hrs`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 min' : `${minutes} mins`;
    }
    
    return this.reservation().duracion;
  }

  // Formatea el ID de reserva con ceros a la izquierda
  formatReservationId(id: number): string {
    return String(id).padStart(3, '0');
  }

  // Formatea el precio como moneda
  getFormattedPrice(): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(this.reservation().precioTotal);
  }

  // Mapea el estado a la variante del badge
  getBadgeVariant(): 'success' | 'danger' | 'warning' | 'neutral' {
    const estado = this.reservation().estadoReservacion?.toUpperCase();
    if (estado === 'CONFIRMADA') return 'success';
    if (estado === 'CANCELADA') return 'danger';
    if (estado === 'SALDO') return 'warning';
    if (estado === 'POR CONFIRMAR') return 'warning';
    return 'neutral';
  }

  // Obtiene el label del estado
  getEstadoLabel(): string {
    return this.reservation().estadoReservacion?.toUpperCase() || 'SIN ESTADO';
  }

  // Getters para usar en el template
  get formattedDate(): string {
    return this.getFormattedDate(this.reservation().tiempoInicio);
  }

  get formattedTimeRange(): string {
    return this.getTimeRange();
  }

  get formattedDuration(): string {
    return this.getFormattedDuration();
  }

  get formattedPrice(): string {
    return this.getFormattedPrice();
  }
}
