import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs';
import { Badge } from '../../../../components/badge/badge';
import { PagoService } from '../../../../services/pago/pago-service';
import { RemotePaymentConfirmationService } from '../../../../services/remote-payment-confirmation/remote-payment-confirmation';
import { Button } from '../../../../components/button/button';
import { PagoById } from '../../../../schemas/pago';

@Component({
  selector: 'app-pago-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, Badge, Button],
  templateUrl: './pago-page.html',
  styleUrl: './pago-page.css',
})
export class PagoPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly pagoService = inject(PagoService);
  private readonly remotePaymentService = inject(RemotePaymentConfirmationService);

  pago = signal<PagoById | undefined>(undefined);
  loading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);

  evidenciaUrl = signal<string | null>(null);
  evidenciaLoading = signal<boolean>(false);
  evidenciaError = signal<string | undefined>(undefined);

  ngOnInit(): void {
    const pagoId = Number(this.route.snapshot.paramMap.get('pagoId'));

    if (!pagoId) {
      this.loading.set(false);
      this.error.set('No se encontro el pago solicitado.');
      return;
    }

    this.loadPago(pagoId);
  }

  ngOnDestroy(): void {
    this.clearEvidenciaUrl();
  }

  getEstadoVariant(estado: string | null | undefined): 'success' | 'danger' | 'neutral' {
    if (estado === 'CONFIRMADO') return 'success';
    if (estado === 'RECHAZADO') return 'danger';
    return 'neutral';
  }

  private loadPago(pagoId: number) {
    this.loading.set(true);
    this.error.set(undefined);

    this.pagoService.getById(pagoId).subscribe({
      next: pago => {
        this.loading.set(false);
        this.pago.set(pago);
        this.loadEvidencia(pago.idPago);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('No se pudo cargar la informacion de este pago.');
      }
    });
  }

  confirmarPago(paymentId: number) {
    this.remotePaymentService.confirmPayment(paymentId).subscribe({
      next: () => {
      },
      error: () => {
        console.error('No se pudo confirmar el pago con ID: ' + paymentId);
      },
    });
  }

  rejectPayment(paymentId: number) {
    this.pagoService.rejectPayment(paymentId).subscribe({
      next: () => {
      },
      error: () => {
        console.error('No se pudo rechazar el pago con id: ' + paymentId);
      },
    });
  }


  private loadEvidencia(pagoId: number) {
    this.evidenciaLoading.set(true);
    this.evidenciaError.set(undefined);
    this.clearEvidenciaUrl();

    this.pagoService.getEvidencia(pagoId).subscribe({
      next: blob => {
        this.evidenciaLoading.set(false);
        const url = URL.createObjectURL(blob);
        this.evidenciaUrl.set(url);
      },
      error: () => {
        this.evidenciaLoading.set(false);
        this.evidenciaError.set('No se pudo cargar la evidencia del pago.');
      }
    });
  }

  private clearEvidenciaUrl() {
    const current = this.evidenciaUrl();
    if (current) {
      URL.revokeObjectURL(current);
      this.evidenciaUrl.set(null);
    }
  }
}
