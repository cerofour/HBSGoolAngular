import { Component } from '@angular/core';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [],
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
      <a href="#" (click)="scrollToCanchas($event)" class="bg-primary text-white hover:bg-primary-hard hover:scale-105 focus:ring-primary px-4 py-2 rounded-md font-medium transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2">
        Reservar ahora
      </a>
    </div>
  </div>
</section>
  `,
})
export class HeroSection {

  scrollToCanchas(event: Event) {
    event.preventDefault();
    const existing = document.getElementById('canchas');
    if (existing) {
      existing.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  }

}


