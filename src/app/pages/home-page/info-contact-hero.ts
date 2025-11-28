import { Component, Inject, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFormComponent } from '../../components/review-form/review-form';
import { AppStateService } from '../../services/app-state/app-state';

@Component({
  selector: 'app-home-info-hero',
  standalone: true,
  template: `
    <!-- Info/Contact Hero Section -->
    <section
      id="visitanos"
      class="relative my-12 w-full h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        [style.background-image]="'url(/cancha.webp)'"
      >
        <!-- Overlay para mejorar legibilidad -->
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-4 text-white">
        <div class="flex w-full gap-8 justify-between">
          <iframe
            width="600"
            height="350"
            style="borde:0"
            cargando="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?q=HBS%20College&key=AIzaSyDkDBGSjxAQEZMDWykRbrWD6u-wfSQB-2k"
          ></iframe>
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Visítanos</h2>
            <p class="text-lg md:text-xl mb-2 drop-shadow">Dirección: Av. la Agricultura KM 01, Ferreñafe 14004</p>
            <p class="text-lg md:text-xl mb-2 drop-shadow">
              Horario: Lun - Dom, 8:00 AM - 11:00 PM
            </p>
            <p class="text-lg md:text-xl drop-shadow">Contacto: +51 935 844 486</p>
          </div>
        </div>
      </div>
    </section>
    <div class="py-8 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
  <app-review-form *ngIf="isUser()"></app-review-form>
      </div>
    </div>
  `,
  imports: [CommonModule, ReviewFormComponent],
})
export class InfoContactHero {
  private appState = inject(AppStateService);
  private readonly placeQuery = 'HBS College';
  private readonly mapsApiKey = 'AIzaSyDkDBGSjxAQEZMDWykRbrWD6u-wfSQB-2k';

  isUser(): boolean {
    if (!this.appState.isLoggedIn()) return false;
    const profile = this.appState.getUserProfile();
    const role = (profile?.rol || '').toString().toUpperCase();
    // Mostrar solo a roles de usuario/cliente. Ajusta la lista si tu backend usa otros valores.
    const allowed = ['USUARIO', 'USER', 'CLIENTE'];
    return allowed.includes(role);
  }

  protected mapsEmbedUrl() {
    const params = new URLSearchParams({ q: this.placeQuery, key: this.mapsApiKey });
    return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
  }
}
