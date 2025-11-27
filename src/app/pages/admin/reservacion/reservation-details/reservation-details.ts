import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs';
import { Badge } from "../../../../components/badge/badge";
import { Reservation } from '../../../../schemas/reservation';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, Badge, RouterLink],
  templateUrl: './reservation-details.html',
  styleUrl: './reservation-details.css',
})
export class ReservationDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly reservationService = inject(ReservationService);

  reservation = signal<Reservation | undefined>(undefined);
  loading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);

  ngOnInit(): void {
    const reservationId = parseInt(this.route.snapshot.paramMap.get('reservacionId') ?? "0");

    this.reservationService.getByIdReservationCashier(reservationId)
      .subscribe({
        next: res => {
          this.loading.set(false);
          this.reservation.set(res);
        },
        error: _ => {
          console.error("No se pudo cargar la reservación.")
          this.loading.set(false);
          this.error.set("No se pudo cargar la información de esta reservación.")
        }
      });
  }
}
