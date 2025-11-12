import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService, Pago } from '../../services/pago/pago-service';
import { AppTable } from '../../components/table/table';
import { Modal } from '../../components/modal/modal';
import { Button } from '../../components/button/button';
import { Reservation, ReservationService } from '../../services/reservation/reservation.service';
import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'app-listado-pagos-page',
  imports: [CommonModule, AppTable, Modal, Button, Pagination],
  templateUrl: './listado-pagos-page.html',
  styleUrl: './listado-pagos-page.css',
})
export class ListadoPagosPage implements OnInit {
  private pagoService = inject(PagoService);
  private reservationService = inject(ReservationService);

  pagos: Pago[] = [];
  loading = false;
  error: string | null = null;
  @ViewChild('reviewModal') reviewModal!: Modal;
  selectedPago: Pago | null = null;
  selectedReserva: Reservation | null = null;
  evidenciaUrl: string | null = null;
  loadingReview = false;

  // Pagination state
  page = 1;
  pageSize = 20;
  totalElements = 0;
  totalPages = 1;

  ngOnInit(): void {
    this.loadPage(this.page);
  }

  loadPage(p: number): void {
    this.loading = true;
    this.error = null;
    this.pagoService.getListadoPagos(p).subscribe({
      next: (resp) => {
        this.pagos = resp.content ?? [];
        this.totalElements = resp.totalElements ?? 0;
        this.pageSize = resp.size ?? this.pageSize;
        this.totalPages = resp.totalPages ?? 1;
        // Prefer the service-reported page if present
        this.page = ((resp as any).number ?? p) + 1;
        this.loading = false;
      },
      error: (_) => {
        this.error = 'No se pudo cargar el listado de pagos';
        this.loading = false;
      },
    });
  }

  onPageChange(p: number): void {
    if (p !== this.page) {
      this.loadPage(p);
    }
  }
  openReview(pago: Pago) {
    if (pago.estadoPago === 'CONFIRMADO') return;
    this.cleanupReview();
    this.selectedPago = pago;
    this.loadingReview = true;
    const reservacionId = pago.reservacionId;
    if (reservacionId != null) {
      this.reservationService.getByIdReservationCashier(reservacionId).subscribe({
        next: (res) => {
          this.selectedReserva = res;
        },
        error: (_) => {},
      });
    }
    this.pagoService.getEvidencia(pago.idPago).subscribe({
      next: (blob) => {
        this.evidenciaUrl = URL.createObjectURL(blob);
        this.loadingReview = false;
      },
      error: (_) => {
        this.loadingReview = false;
      },
    });
    this.reviewModal.open();
  }
  closeReview() {
    this.reviewModal.close();
    this.cleanupReview();
  }
  private cleanupReview() {
    if (this.evidenciaUrl) {
      URL.revokeObjectURL(this.evidenciaUrl);
      this.evidenciaUrl = null;
    }
    this.selectedPago = null;
    this.selectedReserva = null;
    this.loadingReview = false;
  }
  confirmarPago() {
    this.closeReview();
  }
  rechazarPago() {
    this.closeReview();
  }
}
