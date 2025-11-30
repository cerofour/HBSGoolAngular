import { Component } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="w-full bg-primary text-white">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Logo y descripción -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <img src="/hbs-logo.png" alt="HBS Logo" class="h-10 w-auto">
              <span class="text-2xl font-bold">HBSGool</span>
            </div>
            <p class="text-gray-200 text-sm">
              Tu plataforma de gestión deportiva más completa y confiable.
            </p>
          </div>

          <!-- Enlaces rápidos -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-200 hover:text-white transition-colors duration-200">
                  Reservar Cancha
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-200 hover:text-white transition-colors duration-200">
                  Mis Reservas
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-200 hover:text-white transition-colors duration-200">
                  Horarios Disponibles
                </a>
              </li>
            </ul>
          </div>

          <!-- Contacto -->
          <div id="contacto">
            <h3 class="text-lg font-semibold mb-4">Contacto</h3>
            <ul class="space-y-2 text-gray-200 text-sm">
              <li>
                <i class="fas fa-phone mr-2"></i>
                <span>935 844 486</span>
              </li>
              <li>
                <i class="fas fa-envelope mr-2"></i>
                <span>info@hbsgool.com</span>
              </li>
              <li>
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span>Av. la Agricultura KM 01, Ferreñafe 14004</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Línea divisoria y copyright -->
        <div class="mt-8 pt-6 border-t border-white/20">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-200 text-sm">
              © 2024 HBSGool. Todos los derechos reservados.
            </p>
            <div class="flex gap-6">
              <a routerLink="/terminos" class="text-gray-200 hover:text-white transition-colors duration-200 text-sm">
                    Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.css',
})
export class Footer {}

