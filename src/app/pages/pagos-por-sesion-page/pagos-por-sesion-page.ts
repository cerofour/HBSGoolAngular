import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagoService } from '../../services/pago/pago-service';
import { AppTable } from '../../components/table/table';
import { Pagination } from '../../components/pagination/pagination';
import { Badge } from '../../components/badge/badge';
import { Page } from '../../schemas/page';
import { Pago } from '../../schemas/pago';

@Component({
  selector: 'app-pagos-por-sesion-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AppTable, Pagination, Badge],
  templateUrl: './pagos-por-sesion-page.html',
  styleUrls: ['./pagos-por-sesion-page.css'],
})
export class PagosPorSesionPage implements OnInit {
  private pagoService = inject(PagoService);

  sesionCajeroId: number | null = null;

  pagos: Pago[] = [];
  loading = false;
  error: string | null = null;

  // paginación
  page = 1;
  pageSize = 20;
  totalElements = 0;
  totalPages = 1;

  ngOnInit(): void {
    // no cargamos nada hasta que el usuario ingrese una sesión
  }

  loadPage(p: number): void {
    if (!this.sesionCajeroId && this.sesionCajeroId !== 0) {
      this.error = 'Ingresa un ID de sesión de cajero para buscar.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.pagoService.getPagosPorSesion(this.sesionCajeroId!, p, this.pageSize).subscribe({
      next: (resp: Page<Pago>) => {
        this.pagos = resp.content ?? [];
        this.totalElements = resp.totalElements ?? 0;
        this.pageSize = resp.size ?? this.pageSize;
        this.totalPages = resp.totalPages ?? 1;
        this.page = ((resp as any).number ?? p) + 1;
        this.loading = false;
      },
  error: (_: unknown) => {
        this.error = 'No se pudieron cargar los pagos para la sesión indicada';
        this.loading = false;
      },
    });
  }

  onPageChange(p: number): void {
    if (p !== this.page) {
      this.loadPage(p);
    }
  }

  aplicarFiltro(): void {
    this.page = 1;
    this.loadPage(this.page);
  }

  limpiarFiltro(): void {
    this.sesionCajeroId = null;
    this.pagos = [];
    this.totalElements = 0;
    this.totalPages = 1;
    this.page = 1;
    this.error = null;
  }

  getBadgeVariant(estado: string | null | undefined): 'success' | 'danger' | 'neutral' {
    if (estado === 'CONFIRMADO') {
      return 'success';
    }
    if (estado === 'RECHAZADO') {
      return 'danger';
    }
    return 'neutral';
  }

  getBadgeLabel(estado: string | null | undefined): string {
    if (!estado) {
      return 'Sin estado';
    }
    const lower = estado.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
}
