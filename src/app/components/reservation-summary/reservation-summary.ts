import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-summary',
  imports: [],
  templateUrl: './reservation-summary.html',
  styleUrl: './reservation-summary.css',
})
export class ReservationSummary {
  @Input() canchaNombre: string | null = null;
  @Input() fecha: string | null = null;
  @Input() horaInicio: string | null = null;
  @Input() horaFin: string | null = null;
  @Input() pago: number | null = null;
  @Input() imagen = 'cancha.png';
}
