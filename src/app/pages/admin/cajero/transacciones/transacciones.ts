import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppTable } from '../../../../components/table/table';
import { Pagination } from '../../../../components/pagination/pagination';
import { Button } from '../../../../components/button/button';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs';
import { Badge } from '../../../../components/badge/badge';
import { Pago, PagoService } from '../../../../services/pago/pago-service';
import { SesionCajeroService } from '../../../../services/sesion-cajero/sesion-cajero.service';

type ViewMode = 'table' | 'cards';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, RouterModule, AppTable, Pagination, Button, BreadcrumbsComponent, Badge],
  templateUrl: './transacciones.html',
  styleUrl: './transacciones.css',
})
export class Transacciones implements OnInit, OnDestroy {
  private readonly sesionCajeroService = inject(SesionCajeroService);
  private readonly pagoService = inject(PagoService);
  private readonly route = inject(ActivatedRoute);

  transacciones: Pago[] = [];
  loading = false;
  error: string | null = null;
  evidenciaError: string | null = null;

  page = 1;
  pageSize = 10;
  totalElements = 0;
  totalPages = 1;

  sessionId: number | null = null;
  viewMode: ViewMode = 'table';

  evidenciaUrls: Map<number, string> = new Map();
  evidenciaLoadingIds: Set<number> = new Set();

  ngOnInit(): void {
    const sesionIdParam = this.route.snapshot.paramMap.get('sesionId');
    this.sessionId = sesionIdParam ? Number(sesionIdParam) : null;

    if (this.sessionId == null || Number.isNaN(this.sessionId)) {
      this.error = 'No se encontró el identificador de la sesión de cajero.';
      return;
    }

    this.loadPage(this.page);
  }

  ngOnDestroy(): void {
    this.cleanupEvidenceCache();
  }

  onViewModeChange(mode: ViewMode): void {
    if (this.viewMode === mode) return;
    this.viewMode = mode;

    if (mode === 'cards') {
      this.prefetchRemoteEvidence();
    }
  }

  loadPage(p: number): void {
    if (this.sessionId == null) return;

    this.loading = true;
    this.error = null;
    this.evidenciaError = null;
    this.resetEvidenceCache();

    this.sesionCajeroService
      .getAllTransactions({ sessionId: this.sessionId, page: p, size: this.pageSize })
      .subscribe({
        next: (resp) => {
          this.transacciones = resp.content ?? [];
          this.totalElements = resp.totalElements ?? 0;
          this.pageSize = resp.size ?? this.pageSize;
          this.totalPages = resp.totalPages ?? 1;
          this.page = ((resp as any).number ?? p) + 1;
          this.loading = false;

          if (this.viewMode === 'cards') {
            this.prefetchRemoteEvidence();
          }
        },
        error: () => {
          this.loading = false;
          this.error = 'No se pudo cargar el listado de transacciones.';
        },
      });
  }

  onPageChange(p: number): void {
    if (p !== this.page) {
      this.loadPage(p);
    }
  }

  revisarEvidencia(pago: Pago): void {
    this.evidenciaError = null;
    this.ensureEvidence(pago.idPago, true);
  }

  ensureEvidence(pagoId: number, openAfterLoad = false): void {
    const existing = this.evidenciaUrls.get(pagoId);
    if (existing) {
      if (openAfterLoad) this.openEvidence(existing);
      return;
    }

    if (this.evidenciaLoadingIds.has(pagoId)) return;

    this.evidenciaLoadingIds.add(pagoId);
    this.pagoService.getEvidencia(pagoId).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.evidenciaUrls.set(pagoId, url);
        this.evidenciaLoadingIds.delete(pagoId);

        if (openAfterLoad) {
          this.openEvidence(url);
        }
      },
      error: () => {
        this.evidenciaLoadingIds.delete(pagoId);
        this.evidenciaError = `No se pudo cargar la evidencia del pago #${pagoId}.`;
      },
    });
  }

  getEvidenceUrl(pagoId: number): string | null {
    return this.evidenciaUrls.get(pagoId) ?? null;
  }

  getBadgeVariant(estado: string | null | undefined): 'success' | 'danger' | 'neutral' {
    if (estado === 'CONFIRMADO') return 'success';
    if (estado === 'RECHAZADO') return 'danger';
    return 'neutral';
  }

  getBadgeLabel(estado: string | null | undefined): string {
    if (!estado) return 'Sin estado';
    const lower = estado.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  private prefetchRemoteEvidence(): void {
    for (const pago of this.transacciones) {
      if (pago.medioPago?.toUpperCase() === 'REMOTO') {
        this.ensureEvidence(pago.idPago);
      }
    }
  }

  private openEvidence(url: string): void {
    window.open(url, '_blank');
  }

  private resetEvidenceCache(): void {
    this.cleanupEvidenceCache();
    this.evidenciaUrls.clear();
    this.evidenciaLoadingIds.clear();
  }

  private cleanupEvidenceCache(): void {
    for (const url of this.evidenciaUrls.values()) {
      URL.revokeObjectURL(url);
    }
    this.evidenciaUrls.clear();
  }
}
