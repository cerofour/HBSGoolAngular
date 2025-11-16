import { Component, HostListener, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface AdminNavChild {
  label: string;
  path: string;
}

export interface AdminNavItem {
  label: string;
  path: string;
  children: AdminNavChild[];
}

@Component({
  selector: 'app-admin-nav-dropdown',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="relative inline-flex items-center gap-1" (click)="$event.stopPropagation()">
      <a
        [routerLink]="item().path"
        routerLinkActive="text-primary"
        class="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
      >
        {{ item().label }}
      </a>

      <button
        type="button"
        class="inline-flex items-center justify-center text-gray-500 hover:text-primary focus:outline-none"
        aria-haspopup="menu"
        [attr.aria-expanded]="isOpen()"
        (click)="toggleOpen()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.356a.75.75 0 011.04 1.08l-4.24 3.835a.75.75 0 01-1.04 0L5.25 8.29a.75.75 0 01-.02-1.08z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      @if (isOpen()) {
      <div
        class="absolute left-0 top-8 w-56 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-40 py-2"
        role="menu"
      >
        @for (child of item().children; track child.path) {
        <a
          [routerLink]="child.path"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
          (click)="close()"
        >
          {{ child.label }}
        </a>
        }
      </div>
      }
    </div>
  `,
})
export class AdminNavDropdownComponent {
  item = input.required<AdminNavItem>();
  isOpen = signal(false);

  toggleOpen(): void {
    this.isOpen.update((value) => !value);
  }

  close(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
