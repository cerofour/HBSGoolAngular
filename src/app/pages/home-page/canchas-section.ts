import { Component, Input } from '@angular/core';
import { CanchaCard } from '../../components/card/card';
import { CanchaInfo } from '../../services/cancha/cancha.service';

@Component({
  selector: 'app-home-canchas',
  standalone: true,
  imports: [CanchaCard],
  template: `
<!-- Canchas Section -->
<section id="canchas" class="w-full py-12 px-4 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-gray-800 text-center mb-4">
      Nuestras Canchas
    </h2>
    <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
      Descubre nuestras canchas disponibles y elige la perfecta para tu partido
    </p>
    <div class="flex flex-wrap gap-6 justify-center">
      @for (cancha of canchas; track cancha.canchaId) {
        <app-cancha-card [canchaInfo]="cancha" />
      }
    </div>
  </div>
</section>
  `,
})
export class CanchasSection {
  @Input({ required: true }) canchas!: CanchaInfo[];
}