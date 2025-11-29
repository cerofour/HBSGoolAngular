import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-card-user-skeleton',
  imports: [],
  template: `
    <div class="p-4 w-full border border-gray-100 shadow rounded-2xl bg-white animate-pulse">
      <!-- Header: Cancha y Estado -->
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <div class="h-5 w-32 bg-gray-200 rounded"></div>
        </div>
        <div class="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>

      <!-- Fecha -->
      <div class="mb-2">
        <div class="h-6 w-48 bg-gray-200 rounded"></div>
      </div>

      <!-- Hora y Duración -->
      <div class="mb-2">
        <div class="h-5 w-40 bg-gray-200 rounded"></div>
      </div>

      <!-- Detalles -->
      <div class="space-y-2 mb-2">
        <div class="h-4 w-36 bg-gray-200 rounded"></div>
        <div class="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      <!-- Total -->
      <div class="pt-2 border-t border-gray-200">
        <div class="h-4 w-28 bg-gray-200 rounded"></div>
      </div>
    </div>
  `,
})
export class ReservationCardUserSkeleton {}

