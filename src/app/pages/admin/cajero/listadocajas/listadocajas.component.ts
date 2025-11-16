import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SesionCajeroService, ResumenCaja } from '../../../../services/sesion-cajero.service';
import { Button } from '../../../../components/button/button';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-listado-cajas',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, BreadcrumbsComponent],
  templateUrl: './listadocajas.component.html',
})
export class ListadoCajasComponent implements OnInit {

  route = inject(ActivatedRoute);

  fechaInicio: string = '';
  fechaFin: string = '';
  listadoCajas: ResumenCaja[] = [];
  cargando: boolean = false;
  errorMsg: string | null = null;

  cajeroId!: number;

  constructor(private sesionCajeroService: SesionCajeroService) {}

  ngOnInit(): void {
    this.cajeroId = Number(this.route.snapshot.paramMap.get('cajeroId'));
    this.obtenerListado();
  }

  obtenerListado(): void {
    this.errorMsg = null;
    this.cargando = true;

    this.sesionCajeroService
      .getResumenCajas(this.cajeroId, this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (data) => {
          this.listadoCajas = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Ocurrió un error al obtener el listado. Intenta nuevamente.';
          this.cargando = false;
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
    this.obtenerListado();
  }
}
