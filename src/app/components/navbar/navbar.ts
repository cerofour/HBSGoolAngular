import { Component } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-navbar',
  imports: [Button],
  template: `
    <header class="w-full bg-white shadow-md">
      <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo + Title -->
        <div class="flex items-center gap-3">
          <img src="/hbs-logo.png" alt="HBS Logo" class="h-10 w-auto">
          <span class="text-2xl font-bold text-gray-800">HBSGool</span>
        </div>

        <!-- Spacer (flex: 1) -->
        <div class="flex-1"></div>

        <!-- Primary Button -->
        <div class="flex items-center gap-4">
          <app-button variant="primary" (click)="handleReservar()">
            Reservar
          </app-button>
        </div>

        <!-- Spacer (flex: 1) -->
        <div class="flex-1"></div>

        <!-- Navigation Links -->
        <div class="flex items-center gap-6">
          <a href="#" class="text-gray-700 hover:text-primary transition-colors duration-200">
            Contacto
          </a>
          <a href="#" class="text-gray-700 hover:text-primary transition-colors duration-200">
            Ubícanos
          </a>
          <a href="#" class="text-gray-700 hover:text-primary transition-colors duration-200">
            Iniciar Sesión
          </a>
        </div>
      </nav>
    </header>
  `,
  styleUrl: './navbar.css',
})
export class Navbar {
  handleReservar(): void {
    console.log('Reservar clicked');
    // Add your reservation logic here
  }
}
