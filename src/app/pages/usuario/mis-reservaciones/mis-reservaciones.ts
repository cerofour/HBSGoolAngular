import { Component, inject, OnInit } from '@angular/core';
import { Reservation } from '../../../schemas/reservation';
import { ReservationCardUser } from '../../../components/card/reservation-card-user/reservation-card-user';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { ReservationCardUserSkeleton } from '../../../components/card/reservation-card-user/reservation-card-user-skeleton';
import { BreadcrumbsComponent } from "../../../components/breadcrumbs/breadcrumbs";
import { Pagination } from '../../../components/pagination/pagination';

@Component({
  selector: 'app-mis-reservaciones',
  imports: [ReservationCardUser, ReservationCardUserSkeleton, BreadcrumbsComponent, Pagination],
  templateUrl: './mis-reservaciones.html',
  styleUrl: './mis-reservaciones.css',
})
export class MisReservaciones implements OnInit {
  private reservationService = inject(ReservationService)

  // state of request
  loading = true;
  error: string | null = null;

  // Pagination state
  page = 1;
  pageSize = 9;
  totalElements = 0;
  totalPages = 1;

  reservations: Reservation[] = [];

  ngOnInit(): void {
    this.loadPage(this.page);
  }

  loadPage(p: number): void {
    this.loading = true;
    this.error = null;

    this.reservationService.getRerservationsUser({page: p - 1, size: this.pageSize}).subscribe({
      next: (resp) => {
        this.reservations = resp.content ?? [];
        this.totalElements = resp.totalElements ?? 0;
        this.pageSize = resp.size ?? this.pageSize;
        this.totalPages = resp.totalPages ?? 1;
        // Prefer the service-reported page if present
        this.page = ((resp as any).number ?? p) + 1;
        this.loading = false;
      },
      error: (_) => {
        this.error = 'No se pudo cargar el listado de reservaciones de este usuario.';
        this.loading = false;
      },
    });
  }

  onPageChange(p: number): void {
    if (p !== this.page) {
      this.loadPage(p);
    }
  }
}
