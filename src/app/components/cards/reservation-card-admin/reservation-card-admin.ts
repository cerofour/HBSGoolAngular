import { Component, input, output } from '@angular/core';
import { Badge } from '../../badge/badge';
import { ReservationForAdmin } from '../../../schemas/reservation';
import { calculateEndTime } from '../../../utils/general-utils';
import { Button } from '../../button/button';
import { ButtonLink } from '../../button-link/button-link';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation-card-admin',
  standalone: true,
  imports: [Badge, Button, ButtonLink, RouterModule],
  templateUrl: './reservation-card-admin.html',
  styleUrl: './reservation-card-admin.css',
})
export class ReservationCardAdmin {
  reservation = input.required<ReservationForAdmin>();
  completePayment = output<ReservationForAdmin>();

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
    return `${startTime} - ${endTime}`;
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

  // Formatea el saldo como moneda
  getFormattedSaldo(): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(this.reservation().saldo);
  }

  // Mapea el estado a la variante del badge
  getBadgeVariant(): 'success' | 'danger' | 'warning' | 'neutral' {
    const estado = this.reservation().estadoReservacion?.toUpperCase();
    if (estado === 'CONFIRMADA') return 'success';
    if (estado === 'CANCELADA') return 'danger';
    if (estado === 'SALDO') return 'warning';
    if (estado === 'POR CONFIRMAR') return 'warning';
    if (estado === 'FINALIZADA') return 'success';
    return 'neutral';
  }

  // Obtiene el label del estado
  getEstadoLabel(): string {
    return this.reservation().estadoReservacion?.toUpperCase() || 'SIN ESTADO';
  }

  // Determina quién reservó
  getReservadoPor(): string {
    const res = this.reservation();
    const hasCajero = res.cajero !== undefined && res.cajero !== null;
    const hasUsuario = res.usuarioId !== null && res.usuarioId !== undefined;

    if (hasCajero && !hasUsuario) {
      return `Reservado por cajero: ${res.cajero?.nombreCompleto}`;
    } else if (hasCajero && hasUsuario) {
      return `Reservado por usuario: ${res.usuarioId}`;
    }
    return 'Reserva sin información de usuario/cajero';
  }

  // Obtiene información del cajero si existe
  getCajeroInfo(): string | null {
    const res = this.reservation();
    if (res.cajero && res.usuarioId !== null && res.usuarioId !== undefined) {
      return `Pago confirmado por cajero: ${res.cajero.nombreCompleto}`;
    }
    return null;
  }

  // Maneja el click en completar pago
  onCompletePayment(): void {
    this.completePayment.emit(this.reservation());
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

  get formattedSaldo(): string {
    return this.getFormattedSaldo();
  }

  get reservadoPor(): string {
    return this.getReservadoPor();
  }

  get cajeroInfo(): string | null {
    return this.getCajeroInfo();
  }

  get isSaldo(): boolean {
    return this.reservation().estadoReservacion?.toUpperCase() === 'SALDO';
  }

  get detailRoute(): (string | number)[] {
    return ['/admin/ver-reservaciones', this.reservation().idReservacion];
  }
}
