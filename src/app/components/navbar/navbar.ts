import { Component, inject } from '@angular/core';
import { AppStateService } from '../../services/app-state/app-state';
import { RouterLink } from '@angular/router';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown';
import { ButtonLink } from "../button-link/button-link";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ProfileDropdownComponent, ButtonLink],
  template: `
    <header class="w-full bg-white shadow-md">
      <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo + Title -->
        <div class="flex items-center gap-3">
          <img src="/hbs-logo.png" alt="HBS Logo" class="h-10 w-auto" />
          <span class="text-2xl font-bold text-gray-800">HBSGool</span>
        </div>

        <!-- Spacer (flex: 1) -->
        <div class="flex-1"></div>

        <!-- Primary Button -->
        <div class="flex items-center gap-4">
          <app-button-link routerLink="/reservar">Reservar</app-button-link>
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

          @if (appStateService.isLoggedIn()) {
          <app-profile-dropdown></app-profile-dropdown>
          } @else {
          <a
            routerLink="/login"
            class="text-gray-700 hover:text-primary transition-colors duration-200"
          >
            Iniciar Sesión
          </a>
          }
        </div>
      </nav>
    </header>
  `,
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly appStateService = inject(AppStateService);

  constructor() {
    console.log(this.appStateService.getUserProfile());
  }

  handleReservar(): void {
    console.log('Reservar clicked');
  }
}
