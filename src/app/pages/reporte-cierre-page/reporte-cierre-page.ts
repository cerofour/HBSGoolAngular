import { input, Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { CierreCajeroResponse } from '../../services/sesion-cajero/sesion-cajero.service';
import { Button } from "../../components/button/button";
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-reporte-cierre-page',
  imports: [CommonModule, DatePipe, CurrencyPipe, NgClass, Button],
  styleUrl: './reporte-cierre-page.css',
  template: `
    <section class="flex items-start justify-center py-10">
      <div
        class="w-full max-w-lg min-w-96 bg-white border border-slate-200 rounded-xl shadow-sm px-6 py-5 md:px-8 md:py-6"
        *ngIf="cierreResponse() as cierre"
      >
        <h1 class="text-xl md:text-2xl font-semibold text-slate-800 mb-4 text-center">
          Reporte de cierre de caja
        </h1>

        <p class="text-sm text-slate-500 mb-6 text-center">Se ha cerrado la sesión de cajero.</p>

        <div class="space-y-3 text-sm md:text-base">
          <div class="flex justify-between gap-4">
            <span class="font-medium text-slate-500">ID cierre</span>
            <span class="font-semibold text-slate-800">{{ cierre.idCierreCajero }}</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="font-medium text-slate-500">ID sesión cajero</span>
            <span class="font-semibold text-slate-800">{{ cierre.sesionCajeroId }}</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="font-medium text-slate-500">Fecha cierre</span>
            <span class="font-semibold text-slate-800">
              {{ cierre.fecha | date : 'short' }}
            </span>
          </div>
        </div>

        <div class="my-5 border-t border-dashed border-slate-200"></div>

        <div class="space-y-3 text-sm md:text-base">
          <div class="flex justify-between gap-4">
            <span class="font-medium text-slate-500">Monto teórico</span>
            <span class="font-semibold text-slate-800">
              {{ cierre.montoTeorico | currency : 'PEN' : 'symbol-narrow' : '1.2-2' }}
            </span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="font-medium text-slate-500">Monto real</span>
            <span class="font-semibold text-slate-800">
              {{ cierre.montoReal | currency : 'PEN' : 'symbol-narrow' : '1.2-2' }}
            </span>
          </div>

          <div class="flex justify-between items-center gap-4 mt-4">
            <span class="font-semibold text-slate-600">Diferencia</span>
            <span
              class="inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm font-semibold"
              [ngClass]="{
                'bg-red-50 text-danger ring-1 ring-red-200':
                  cierre.montoReal - cierre.montoTeorico < 0,
                'bg-blue-50 text-primary ring-1 ring-cyan-200':
                  cierre.montoReal - cierre.montoTeorico > 0,
                'bg-emerald-50 text-gray-900 ring-1 ring-emerald-200':
                  cierre.montoReal - cierre.montoTeorico === 0
              }"
            >
              {{
                cierre.montoReal - cierre.montoTeorico
                  | currency : 'PEN' : 'symbol-narrow' : '1.2-2'
              }}
            </span>
          </div>

          <div class="my-5 border-t border-dashed border-slate-200"></div>
          <div class="flex justify-between gap-4">
            <span class="font-medium text-slate-500">Dinero Enviado a Bóveda</span>
            <span class="font-semibold text-slate-800">
              {{ cierre.montoReal | currency : 'PEN' : 'symbol-narrow' : '1.2-2' }}
            </span>
          </div>

          <div class="my-5 border-t border-dashed border-slate-200"></div>
          <div class="flex justify-between gap-4">
            <app-button variant="primary" (click)="logout()">Cerrar Sesión</app-button>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class ReporteCierrePage {
  cierreResponse = input.required<CierreCajeroResponse>();

  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
