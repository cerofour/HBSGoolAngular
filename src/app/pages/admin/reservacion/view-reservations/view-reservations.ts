import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { Button } from '../../../../components/button/button';
import { AppTable } from '../../../../components/table/table';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs';
import { PagoService } from '../../../../services/pago/pago-service';
import { Modal } from '../../../../components/modal/modal';
import { ReservationForAdmin } from '../../../../schemas/reservation';
import { AppStateService } from '../../../../services/app-state/app-state';
import { Pagination } from '../../../../components/pagination/pagination';
import { ReservationCardAdmin } from '../../../../components/cards/reservation-card-admin/reservation-card-admin';
import { ButtonLink } from '../../../../components/button-link/button-link';

@Component({
  selector: 'app-view-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, AppTable, RouterModule, BreadcrumbsComponent, Modal, Pagination, ReservationCardAdmin, ButtonLink],
  templateUrl: `./view-reservations.html`,
  styleUrl: './view-reservations.css',
})
export class ViewReservations {
  @ViewChild('completePaymentModal') completePaymentModal?: Modal;

  private reservationService = inject(ReservationService);
  private pagoService = inject(PagoService);
  private appState = inject(AppStateService);
  
  cargando: boolean = false;
  errorMsg: string | null = null;
  
  selectedReservation: ReservationForAdmin | null = null;
  paymentForm = {
    cantidadDinero: 0,
    medioPago: '',
    evidencia: null as File | null,
  };
  completePaymentError: string | null = null;
  completePaymentLoading = false;
  
  reservations: ReservationForAdmin[] = [];
  
  // Filtros
  usuarioId?: number;
  canchaId?: number;
  estado: string = '';
  dni: string = '';

  // Pagination state
  page = 1;
  pageSize = 20;
  totalElements = 0;
  totalPages = 1;

  // View mode: 'table' or 'cards'
  viewMode: 'table' | 'cards' = 'table';

  ngOnInit() {
    this.loadPage(this.page);
  }

  loadPage(p: number): void {
    this.page = p;
    this.obtenerListado();
  }

  onPageChange(p: number): void {
    if (p !== this.page) {
      this.loadPage(p);
    }
  }

  filtrar(): void {
    this.page = 1;
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
      page: this.page - 1,
      size: this.pageSize
    };

    this.reservationService.getListReservationAdmin(filters).subscribe({
      next: (data) => {
        this.reservations = data.content ?? [];
        this.cargando = false;
        this.totalElements = data.totalElements ?? 0;
        this.pageSize = data.size ?? this.pageSize;
        this.totalPages = data.totalPages ?? 1;

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

  openCompletePaymentModal(reservation: ReservationForAdmin): void {
    this.selectedReservation = reservation;
    this.resetPaymentForm(reservation);
    this.completePaymentError = null;
    this.completePaymentModal?.open();
  }

  closeCompletePaymentModal(): void {
    this.completePaymentModal?.close();
    this.selectedReservation = null;
    this.completePaymentError = null;
    this.resetPaymentForm();
  }

  onEvidenceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.paymentForm.evidencia = input.files?.[0] ?? null;
  }

  onMedioPagoChange(): void {
    if (!this.shouldRequestEvidence()) {
      this.paymentForm.evidencia = null;
    }
  }

  shouldRequestEvidence(): boolean {
    return this.paymentForm.medioPago === 'REMOTO';
  }

  submitCompletePayment(form: NgForm): void {
    if (!this.selectedReservation) {
      return;
    }

    if (!form.valid) {
      this.completePaymentError = 'Completa todos los campos requeridos.';
      return;
    }

    if (this.shouldRequestEvidence() && !this.paymentForm.evidencia) {
      this.completePaymentError = 'Debes adjuntar la evidencia para pagos remotos.';
      return;
    }

    this.completePaymentError = null;
    this.completePaymentLoading = true;

    this.pagoService.createPaymentForReservation(this.selectedReservation.idReservacion, {
      cantidadDinero: this.paymentForm.cantidadDinero,
      sesionCajeroId: this.appState.getCashierSession()?.sessionId ?? 0,
      medioPago: this.paymentForm.medioPago,
      evidencia: this.paymentForm.evidencia ?? undefined,
    }).subscribe({
      next: () => {
        this.completePaymentLoading = false;
        this.closeCompletePaymentModal();
        this.page = 1;
        this.obtenerListado();
      },
      error: (err) => {
        console.error(err);
        this.completePaymentLoading = false;
        this.completePaymentError = 'No se pudo completar el pago. Intenta nuevamente.';
      }
    });
  }

  private resetPaymentForm(reservation?: ReservationForAdmin | null): void {
    this.paymentForm = {
      cantidadDinero: reservation?.saldo ?? 0,
      medioPago: '',
      evidencia: null,
    };
  }

  setViewMode(mode: 'table' | 'cards'): void {
    this.viewMode = mode;
  }

  public getFormattedDuration(duration: string): string {
    return duration.slice(2);
  }

}
