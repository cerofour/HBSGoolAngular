import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SesionCajeroService, ResumenCaja } from '../../services/sesion-cajero.service';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-listado-cajas',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './listadocajas.component.html',
})
export class ListadoCajasComponent implements OnInit {

  fechaInicio: string = '';
  fechaFin: string = '';
  listadoCajas: ResumenCaja[] = [];
  cargando: boolean = false;
  errorMsg: string | null = null;

  constructor(private sesionCajeroService: SesionCajeroService) {}

  ngOnInit(): void {
    this.obtenerListado();
  }

  obtenerListado(cajeroId: number = 1): void {
    this.errorMsg = null;
    this.cargando = true;

    this.sesionCajeroService
      .getResumenCajas(cajeroId, this.fechaInicio, this.fechaFin)
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
