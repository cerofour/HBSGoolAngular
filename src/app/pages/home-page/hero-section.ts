import { Component } from '@angular/core';
import { ButtonLink } from '../../components/button-link/button-link';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [ButtonLink],
  template: `
<!-- Hero Section -->
<section class="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
  <!-- Background Image -->
  <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" [style.background-image]="'url(/futbol-hero-1.png)'">
    <!-- Overlay para mejorar legibilidad -->
    <div class="absolute inset-0 bg-black/50"></div>
  </div>

  <!-- Hero Content -->
  <div class="relative z-10 text-center px-4">
    <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
      Reserva Tu Cancha de Fútbol
    </h1>
    <p class="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl mx-auto">
      Disfruta del mejor fútbol en nuestras canchas de primera calidad
    </p>
    <div class="flex justify-center">
      <app-button-link routerLink="#canchas" variant="primary" [fullWidth]="false" class="px-8 py-4 text-lg">
        Reservar Ahora
      </app-button-link>
    </div>
  </div>
</section>
  `,
})
export class HeroSection {}


