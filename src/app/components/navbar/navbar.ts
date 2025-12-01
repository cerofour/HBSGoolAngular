import { Component, computed, inject } from '@angular/core';
import { AppStateService } from '../../services/app-state/app-state';
import { Route, Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown';
import { routes } from '../../app.routes';
import { AdminNavDropdownComponent, AdminNavItem } from './admin-nav-dropdown';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ProfileDropdownComponent, AdminNavDropdownComponent],
  template: `
    <header class="w-full bg-white shadow-md">
      <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo + Title -->
        <div class="flex items-center gap-3">
          <img src="/hbs-logo.png" alt="HBS Logo" class="h-10 w-auto" />
          <a [routerLink]="['/']" class="text-2xl font-bold text-gray-800">HBSGool</a>
        </div>

        <!-- Spacer (flex: 1) -->
        <div class="flex-1"></div>

        <!-- Navigation Links -->
        <div class="flex items-center gap-6">
          <a href="#" (click)="scrollToContacto($event)" class="text-gray-700 hover:text-primary transition-colors duration-200">
            Contacto
          </a>
          <a href="#" (click)="scrollToVisitanos($event)" class="text-gray-700 hover:text-primary transition-colors duration-200">
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

      @if (showAdminNav()) {
      <div class="bg-gray-50 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-wrap items-center gap-4 py-2">
            @for (item of adminNavItems; track item.path) {
              @if (item.children.length) {
              <app-admin-nav-dropdown [item]="item"></app-admin-nav-dropdown>
              } @else {
              <a
                [routerLink]="item.path"
                routerLinkActive="text-primary"
                [routerLinkActiveOptions]="{ exact: true }"
                class="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {{ item.label }}
              </a>
              }
            }
          </div>
        </div>
      </div>
      }
    </header>
  `,
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly appStateService = inject(AppStateService);
  private readonly userProfile = this.appStateService.userProfileSignal();
  protected readonly showAdminNav = computed(() => {
    const role = this.userProfile()?.rol;
    return role === 'ADMIN' || role === 'CASHIER';
  });
  protected readonly adminNavItems: AdminNavItem[] = ADMIN_NAV_ITEMS;
  private readonly router = inject(Router);

  constructor() {
    console.log(this.appStateService.getUserProfile());
  }

  scrollToContacto(event: Event) {
    event.preventDefault();
    // Intento inmediato y reintentos si no existe aún
    const existing = document.getElementById('contacto');
    if (existing) {
      existing.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Navegar al home y luego intentar hacer scroll con reintentos
    this.router.navigate(['/'], { fragment: 'contacto' }).then(() => {
      // Esperamos NavigationEnd y luego hacemos reintentos si hace falta
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd), take(1)).subscribe(() => {
        this.scrollToElementWithRetry('contacto');
      });
    });
  }

  scrollToVisitanos(event: Event) {
    event.preventDefault();
    const existing = document.getElementById('visitanos');
    if (existing) {
      existing.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    this.router.navigate(['/'], { fragment: 'visitanos' }).then(() => {
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd), take(1)).subscribe(() => {
        this.scrollToElementWithRetry('visitanos');
      });
    });
  }

  private scrollToElementWithRetry(id: string, attempts = 20, delay = 150) {
    let tries = 0;
    let timer: number | null = null;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (timer !== null) {
          clearInterval(timer);
        }
        return;
      }

      tries++;
      if (tries >= attempts) {
        if (timer !== null) {
          clearInterval(timer);
        }
      }
    };

    // Iniciar interval y ejecutar inmediatamente
    timer = window.setInterval(tryScroll, delay) as unknown as number;
    tryScroll();
  }

  private scrollToFragment() {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // si no existe el elemento, navegar al home para que lo cargue
      // (no hacemos nada más)
    }
  }

  handleReservar(): void {
    console.log('Reservar clicked');
  }
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = buildAdminNavItems();

function buildAdminNavItems(): AdminNavItem[] {
  const adminRoute = routes.find((route) => route.path === 'admin');

  if (!adminRoute || !adminRoute.children) {
    return [];
  }

  return adminRoute.children
    .filter(hasStaticPath)
    .map((child) => {
      const basePath = `/admin/${child.path}`;
      const children =
        child.children
          ?.filter(hasStaticPath)
          .filter((grandChild) => !grandChild.path?.includes(':'))
          .map((grandChild) => ({
            label: getRouteLabel(grandChild),
            path: `${basePath}/${grandChild.path}`,
          })) ?? [];

      return {
        label: getRouteLabel(child),
        path: basePath,
        children,
      };
    });
}

function hasStaticPath(route: Route): route is Route & { path: string } {
  return typeof route.path === 'string' && route.path.length > 0 && !route.redirectTo && route.path !== 'pago';
}

function getRouteLabel(route: Route): string {
  const breadcrumb = route.data?.['breadcrumb'];

  if (typeof breadcrumb === 'string' && breadcrumb.trim().length > 0) {
    return breadcrumb.trim();
  }

  return route.path
    ?.split('/')
    .map((segment) =>
      segment
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    )
    .join(' ')
    .trim() || 'Sin título';
}
