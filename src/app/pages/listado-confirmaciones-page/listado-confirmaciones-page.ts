import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RemotePaymentConfirmation, RemotePaymentConfirmationService } from '../../services/remote-payment-confirmation/remote-payment-confirmation';
import { AppTable } from '../../components/table/table';
import { Pagination } from '../../components/pagination/pagination';
import { Button } from '../../components/button/button';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-listado-confirmaciones-page',
  imports: [CommonModule, BreadcrumbsComponent, FormsModule, AppTable, Pagination, Button],
  templateUrl: './listado-confirmaciones-page.html',
  styleUrls: ['./listado-confirmaciones-page.css'],
})
export class ListadoConfirmacionesPage implements OnInit {
  private remoteService = inject(RemotePaymentConfirmationService);

  // Raw data from backend (current page content)
  allConfirmations: RemotePaymentConfirmation[] = [];

  // Current page content
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
    this.loadPage(this.page);
  }

  loadPage(page: number): void {
    this.loading = true;
    this.error = null;

    const filters: any = {
      cashierId: this.cashierId ?? undefined,
      date: this.date ?? undefined,
      startDate: this.startDate ?? undefined,
      endDate: this.endDate ?? undefined,
      page: page - 1,
      size: this.pageSize,
    };

    this.remoteService.getConfirmations(filters).subscribe({
      next: (resp: RemotePaymentConfirmation[]) => {
        if (!resp) {
          this.error = 'Respuesta inesperada del servidor';
          this.loading = false;
          return;
        }

        this.allConfirmations = resp ?? [];
        this.confirmations = this.allConfirmations;
        this.totalElements = resp.length ?? 0;
        this.pageSize = 1;
        this.totalPages = 1;
        this.page = 1;
        this.loading = false;
      },
      error: (err: unknown) => {
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
      this.loadPage(p);
    }
  }

  aplicarFiltros(): void {
    this.page = 1;
    this.loadPage(this.page);
  }

  clearFilters(): void {
    this.cashierId = null;
    this.date = null;
    this.startDate = null;
    this.endDate = null;
    this.page = 1;
    this.loadPage(this.page);
  }

  confirmar(paymentId: number): void {
    this.remoteService.confirmPayment(paymentId).subscribe({
      next: () => {
        // after confirming, reload list
        this.loadPage(this.page);
      },
      error: () => {
        console.error('No se pudo confirmar el pago id: ' + paymentId);
      },
    });
  }
}
