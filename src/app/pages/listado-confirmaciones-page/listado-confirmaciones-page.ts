import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RemotePaymentConfirmation, RemotePaymentConfirmationService } from '../../services/remote-payment-confirmation/remote-payment-confirmation';
import { AppTable } from '../../components/table/table';
import { Pagination } from '../../components/pagination/pagination';
import { Button } from '../../components/button/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-confirmaciones-page',
  imports: [CommonModule, FormsModule, AppTable, Pagination, Button],
  templateUrl: './listado-confirmaciones-page.html',
  styleUrl: './listado-confirmaciones-page.css',
})
export class ListadoConfirmacionesPage implements OnInit {
  private remoteService = inject(RemotePaymentConfirmationService);

  // Raw data from backend
  allConfirmations: RemotePaymentConfirmation[] = [];

  // Current page slice
  confirmations: RemotePaymentConfirmation[] = [];

  // Filters
  cashierId: number | null = null;
  date: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;

  // Loading / error
  loading = false;
  error: string | null = null;

  // Pagination
  page = 1;
  pageSize = 20;
  totalElements = 0;
  totalPages = 1;

  ngOnInit(): void {
    this.loadConfirmations();
  }

  private applyPagination(): void {
    this.totalElements = this.allConfirmations.length;
    const start = (this.page - 1) * this.pageSize;
    this.confirmations = this.allConfirmations.slice(start, start + this.pageSize);
    // compute total pages and adjust current page if out of range
    this.totalPages = Math.max(1, Math.ceil(this.totalElements / Math.max(1, this.pageSize)));
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
      const newStart = (this.page - 1) * this.pageSize;
      this.confirmations = this.allConfirmations.slice(newStart, newStart + this.pageSize);
    }
  }

  loadConfirmations(): void {
    this.loading = true;
    this.error = null;

    const filters: any = {};
    if (this.cashierId != null) filters.cashierId = this.cashierId;
    if (this.date) filters.date = this.date;
    if (this.startDate) filters.startDate = this.startDate;
    if (this.endDate) filters.endDate = this.endDate;

    this.remoteService.getConfirmations(filters).subscribe({
      next: (list) => {
        // If backend returns null/undefined, treat as empty list.
        if (!Array.isArray(list)) {
          this.error = 'Respuesta inesperada del servidor';
          this.loading = false;
          return;
        }

        this.allConfirmations = list;
        this.page = 1;
        this.applyPagination();
        this.loading = false;
      },
      error: (err: unknown) => {
        // Provide a more informative error message to help debugging.
        if (err instanceof HttpErrorResponse) {
          if (err.error && typeof err.error === 'string') {
            this.error = `Error ${err.status}: ${err.error}`;
          } else if (err.status) {
            this.error = `Error de red: ${err.status} ${err.statusText}`;
          } else {
            this.error = `Error al conectar con el servidor: ${err.message}`;
          }
        } else {
          this.error = 'No se pudieron cargar las confirmaciones';
        }

        this.loading = false;
      },
    });
  }

  onPageChange(p: number): void {
    if (p !== this.page) {
      this.page = p;
      this.applyPagination();
    }
  }

  aplicarFiltros(): void {
    this.loadConfirmations();
  }

  clearFilters(): void {
    this.cashierId = null;
    this.date = null;
    this.startDate = null;
    this.endDate = null;
    this.loadConfirmations();
  }

  confirmar(paymentId: number): void {
    this.remoteService.confirmPayment(paymentId).subscribe({
      next: () => {
        // after confirming, reload list
        this.loadConfirmations();
      },
      error: () => {
        console.error('No se pudo confirmar el pago id: ' + paymentId);
      },
    });
  }
}
