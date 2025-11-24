import { Component, HostListener, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state/app-state';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './profile-dropdown.css',
  template: `
    <div class="relative inline-flex items-center gap-2" (click)="$event.stopPropagation()">
      <span class="text-sm md:text-base text-gray-800">Hola {{ userFirstName || 'Usuario' }}</span>

      <button
        type="button"
        class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-haspopup="menu"
        [attr.aria-expanded]="isOpen()"
        (click)="toggleOpen()"
      >
        <!-- Simple chevron icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.356a.75.75 0 011.04 1.08l-4.24 3.835a.75.75 0 01-1.04 0L5.25 8.29a.75.75 0 01-.02-1.08z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      @if (isOpen()) {
      <div
        class="absolute right-0 top-11 w-64 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50 overflow-hidden"
        role="menu"
        aria-label="profile menu"
      >
        <div class="px-4 py-3 bg-gray-50 border-b border-gray-100 text-left">
          <p class="text-sm text-gray-500">Sesión iniciada como</p>
          <p class="mt-1 font-medium text-gray-900">{{ userFullName || 'Nombre no disponible' }}</p>
          <p class="text-xs text-gray-500">{{ userRole || 'Rol no disponible' }}</p>

          @if (userRole === 'CASHIER') {
            <p class="text-xs text-gray-500">Sesión de Cajero: {{ this.appStateService.getCashierSession()?.sessionId }}</p>
          }

        </div>

        <div class="p-2">
          @if (userRole === 'USER') {
          <button
            type="button"
            class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            (click)="onMyReservations()"
          >
            Mis Reservaciones
          </button>
          } @if (userRole === 'CASHIER' || userRole === 'ADMIN') {
          <button
            type="button"
            class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            (click)="onDashboard()"
          >
            Dashboard
          </button>
          <button
            type="button"
            class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            (click)="onManageCashiers()"
          >
            Gestionar Cajeros
          </button>
          <button
            type="button"
            class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            (click)="onReservations()"
          >
            Reservaciones
          </button>
          }

          <button
            type="button"
            class="w-full text-left px-3 py-2 rounded-md text-danger hover:bg-danger/10"
            (click)="onLogout()"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      }
    </div>
  `,
})
export class ProfileDropdownComponent {
  protected readonly appStateService = inject(AppStateService);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  userFirstName = this.appStateService.getUserProfile()?.nombre;
  userFullName = this.appStateService.getFullName();
  userRole = this.appStateService.getUserProfile()?.rol;

  requestLogout = output<void>();
  requestMyReservations = output<void>();
  requestDashboard = output<void>();
  requestManageCashiers = output<void>();
  requestReservations = output<void>();

  isOpen = signal(false);

  toggleOpen(): void {
    this.isOpen.update((v) => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  onLogout(): void {
    this.requestLogout.emit();
    this.auth.logout();
    this.close();
  }

  onMyReservations(): void {
    this.requestMyReservations.emit();
    this.close();
  }

  onDashboard(): void {
    this.requestDashboard.emit();
    this.router.navigate(['/admin', 'dashboard']);
    this.close();
  }

  onManageCashiers(): void {
    this.requestManageCashiers.emit();
    this.router.navigate(['/admin', 'cajero']);
    this.close();
  }

  onReservations(): void {
    this.requestReservations.emit();
    this.close();
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
