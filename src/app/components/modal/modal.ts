import { Component, HostListener, input, signal } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" (click)="onBackdropClick()"></div>

        <!-- Modal dialog -->
        <div class="relative z-10 w-full max-w-lg mx-4 rounded-xl bg-white shadow-2xl border border-gray-200">
          <!-- Header -->
          <div class="flex items-center justify-between px-4 py-3 rounded-t-xl">

			@if (title()) {
            	<h3 class="text-lg font-semibold">{{title()}}</h3>
			} @else {
            	<h3 class="text-lg font-semibold">Información</h3>
			}

            <button type="button" (click)="close()" class="p-1 rounded hover:bg-white/20 transition">
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <!-- Body -->
          <div class="p-4 text-gray-800">
            <ng-content></ng-content>
          </div>

          <!-- Footer (opcional para acciones) -->
          <div class="px-4 py-3 flex justify-end gap-2 border-t border-gray-200 rounded-b-xl bg-gray-50">
            <button type="button"
                    class="px-4 py-2 rounded-md bg-secondary text-white hover:bg-secondary-dark transition-colors"
                    (click)="close()">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./modal.css'],
})
export class Modal {
  // Signal de control de visibilidad
  title = input('');
  isOpen = signal<boolean>(false);
  preventClose = input<boolean>(false);

  // Métodos públicos para abrir/cerrar desde el padre
  open(): void { this.isOpen.set(true); }
  close(): void { if (!this.preventClose()) this.isOpen.set(false); }
  onBackdropClick(): void { if (!this.preventClose()) this.close(); }

  // Cerrar con tecla Escape
  @HostListener('document:keydown.escape')
  handleEscape(): void { if (!this.preventClose()) this.close(); }
}
