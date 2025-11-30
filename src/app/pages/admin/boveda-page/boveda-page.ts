import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BovedaService, BovedaResponse, MovimientoBoveda, CreateMovimientoRequest } from '../../../services/boveda/boveda-service';
import { MyInput } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import { ToastService } from '../../../services/toast/toast.service';
import { AppTable } from '../../../components/table/table';

@Component({
  selector: 'app-boveda-page',
  imports: [CommonModule, ReactiveFormsModule, MyInput, Button, DatePipe, AppTable],
  templateUrl: './boveda-page.html',
  styleUrl: './boveda-page.css',
})
export class BovedaPage implements OnInit {
  private bovedaService = inject(BovedaService);
  private toast = inject(ToastService);

  bovedaData: BovedaResponse | null = null;
  loading = false;
  error: string | null = null;
  submitting = false;

  movimientoForm = new FormGroup({
    tipoMovimientoBoveda: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required, Validators.min(0.01)]),
    motivo: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.loadBoveda();
  }

  loadBoveda(): void {
    this.loading = true;
    this.error = null;

    this.bovedaService.getBoveda().subscribe({
      next: (data) => {
        this.bovedaData = data;
        this.loading = false;
      },
      error: (_) => {
        this.error = 'No se pudo cargar la información de la bóveda';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.movimientoForm.invalid) {
      this.toast.error('Error', 'Por favor completa todos los campos correctamente');
      return;
    }

    this.submitting = true;
    const formValue = this.movimientoForm.value;
    
    const movimiento: CreateMovimientoRequest = {
      tipoMovimientoBoveda: formValue.tipoMovimientoBoveda ?? '',
      motivo: formValue.motivo ?? '',
      monto: parseFloat(formValue.monto ?? '0')
    };

    this.bovedaService.createMovimiento(movimiento).subscribe({
      next: () => {
        this.toast.success('Éxito', 'Movimiento creado correctamente');
        this.movimientoForm.reset();
        this.loadBoveda();
        this.submitting = false;
      },
      error: (err) => {
        const msg = err?.error?.message || 'No se pudo crear el movimiento';
        this.toast.error('Error', msg);
        this.submitting = false;
      }
    });
  }

  get movimientos(): MovimientoBoveda[] {
    return this.bovedaData?.movimientos ?? [];
  }

  get dineroTotal(): number {
    return this.bovedaData?.dineroTotal ?? 0;
  }

  get movimientosTotales(): number {
    return this.bovedaData?.movimientosTotales ?? 0;
  }
}
