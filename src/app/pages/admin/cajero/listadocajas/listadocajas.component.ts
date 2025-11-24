import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SesionCajeroService, ResumenCaja } from '../../../../services/sesion-cajero/sesion-cajero.service';
import { Button } from '../../../../components/button/button';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs';
import { Pagination } from '../../../../components/pagination/pagination';
import { AppTable } from '../../../../components/table/table';
import { Badge } from '../../../../components/badge/badge';
import { ButtonLink } from "../../../../components/button-link/button-link";
import { AppStateService } from '../../../../services/app-state/app-state';

@Component({
  selector: 'app-listado-cajas',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, BreadcrumbsComponent, AppTable, Pagination, Badge, ButtonLink, RouterModule, RouterOutlet],
  templateUrl: './listadocajas.component.html',
})
export class ListadoCajasComponent implements OnInit {

  route = inject(ActivatedRoute);
  appState = inject(AppStateService);

  fechaInicio: string = '';
  fechaFin: string = '';
  summaryList: ResumenCaja[] = [];
  loading: boolean = false;
  errorMsg: string | null = null;

  cajeroId!: number;

  page: number = 1;
  pageSize: number = 20;
  totalElements: number = 0;

  constructor(private sesionCajeroService: SesionCajeroService) {}

  ngOnInit(): void {

    let cashierIdParam = this.route.snapshot.paramMap.get('cajeroId');

    this.cajeroId = (cashierIdParam) ? Number(cashierIdParam) : (this.appState.getCashierSession()?.sessionId ?? 0);
    this.loadPage(this.page);
  }

  loadPage(page: number): void {
    this.page = page;
    this.obtenerListado();
  }

  obtenerListado(): void {
    this.errorMsg = null;
    this.loading = (true);

    this.sesionCajeroService
      .getResumenCajas(this.cajeroId, this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (data) => {
          this.summaryList = data ?? [];
          this.totalElements = data.length; 
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Ocurrió un error al obtener el listado. Intenta nuevamente.';
          this.loading = false;
        },
      });
  }

  isDateRangeValid(): boolean {
    if (!this.fechaInicio || !this.fechaFin) return true;
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);
    return inicio <= fin;
  }

  filtrar(): void {
    if (!this.isDateRangeValid()) {
      this.errorMsg = 'La fecha fin debe ser igual o posterior a la fecha inicio.';
      return;
    }
    this.loadPage(1);
  }

  onPageChange(newPage: number): void {
    if (newPage !== this.page) {
      this.loadPage(newPage);
    }
  }

  getTransaccionesRoute(sesionId: number): (string | number)[] {
    return ['/admin', 'cajero', 'transacciones', sesionId];
  }
}
