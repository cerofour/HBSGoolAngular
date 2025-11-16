import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CajeroService, CashierDTO } from '../../services/cajero.service';
import { AppTable } from '../../components/table/table';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-cajero-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class CajeroPage {}

@Component({
  selector: 'app-cajero-list',
  standalone: true,
  imports: [CommonModule, NgClass, RouterModule, RouterLink, AppTable, BreadcrumbsComponent],
  template: `
    <section class="p-6">
      <app-breadcrumbs></app-breadcrumbs>

      <header class="mb-4">
        <h1 class="text-2xl font-semibold text-gray-800">Listado de Cajeros</h1>
        <p class="text-gray-500 text-sm">
          Consulta la información de los cajeros registrados.
        </p>
      </header>

      @if (loading) {
        <p class="text-sm text-gray-500">Cargando cajeros...</p>
      } @else if (errorMessage) {
        <div class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {{ errorMessage }}
        </div>
      } @else if (cajeros.length === 0) {
        <p class="text-sm text-gray-500">No se encontraron cajeros registrados.</p>
      } @else {
        <app-table>
          <ng-container table-header>
            <tr>
              <th class="px-4 py-3 font-medium">ID Cajero</th>
              <th class="px-4 py-3 font-medium">ID Usuario</th>
              <th class="px-4 py-3 font-medium">Nombre Completo</th>
              <th class="px-4 py-3 font-medium">Email</th>
              <th class="px-4 py-3 font-medium">DNI</th>
              <th class="px-4 py-3 font-medium">Celular</th>
              <th class="px-4 py-3 font-medium">Activo</th>
            </tr>
          </ng-container>
          <ng-container table-body>
            @for (cajero of cajeros; track cajero.idCajero) {
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3">
                  <a
                    class="text-primary underline decoration-transparent transition hover:decoration-primary"
                    [routerLink]="['resumen', cajero.idCajero]"
                  >
                    {{ cajero.idCajero }} (Ver Resumen)
                  </a>
                </td>
                <td class="px-4 py-3">{{ cajero.idUsuario }}</td>
                <td class="px-4 py-3">{{ cajero.nombreCompleto }}</td>
                <td class="px-4 py-3">{{ cajero.email }}</td>
                <td class="px-4 py-3">{{ cajero.dni }}</td>
                <td class="px-4 py-3">{{ cajero.celular }}</td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                    [ngClass]="{
                      'bg-green-100 text-green-800': cajero.activo,
                      'bg-red-100 text-red-700': !cajero.activo
                    }"
                  >
                    <span
                      class="h-2 w-2 rounded-full"
                      [ngClass]="{
                        'bg-green-500': cajero.activo,
                        'bg-red-500': !cajero.activo
                      }"
                    ></span>
                    {{ cajero.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
              </tr>
            }
          </ng-container>
        </app-table>
      }
    </section>
  `,
})
export class CajeroListComponent implements OnInit {
  private readonly cajeroService = inject(CajeroService);

  cajeros: CashierDTO[] = [];
  loading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchCashiers();
  }

  private fetchCashiers(): void {
    this.loading = true;
    this.errorMessage = null;

    this.cajeroService.getAllCashier().subscribe({
      next: (data) => {
        this.cajeros = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener cajeros:', error);
        this.errorMessage =
          'No se pudo obtener la lista de cajeros. Inténtalo nuevamente más tarde.';
        this.loading = false;
      },
    });
  }
}

