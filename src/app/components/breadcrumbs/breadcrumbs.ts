import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

type BreadcrumbBuilder = (route: ActivatedRouteSnapshot) => string | null;

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (breadcrumbs.length > 0) {
      <nav class="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-2">
          @for (breadcrumb of breadcrumbs; track breadcrumb.url; let last = $last) {
            <li class="flex items-center gap-2">
              @if (!last) {
                <a
                  class="font-medium text-primary underline decoration-transparent transition hover:decoration-primary"
                  [routerLink]="breadcrumb.url"
                >
                  {{ breadcrumb.label }}
                </a>
                <span class="text-gray-400">/</span>
              } @else {
                <span class="font-semibold text-gray-700">{{ breadcrumb.label }}</span>
              }
            </li>
          }
        </ol>
      </nav>
    }
  `,
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  private readonly subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);

    const navSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
      });

    this.subscription.add(navSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const children = route.children;

    if (!children || children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== 'primary') {
        continue;
      }

      const snapshot = child.snapshot;
      const routeURL = snapshot.url.map((segment) => segment.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;

      if (routeURL) {
        const label = this.resolveLabel(snapshot);
        if (label) {
          breadcrumbs.push({
            label,
            url: nextUrl || '/',
          });
        }
      }

      return this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

  private resolveLabel(snapshot: ActivatedRouteSnapshot): string | null {
    const data = snapshot.data?.['breadcrumb'] as string | BreadcrumbBuilder | undefined;

    if (typeof data === 'function') {
      return data(snapshot);
    }

    if (typeof data === 'string') {
      return data;
    }

    return this.formatLabelFromPath(snapshot.routeConfig?.path);
  }

  private formatLabelFromPath(path?: string): string | null {
    if (!path) {
      return null;
    }

    const cleanPath = path.replace(/:.+/, '').replace(/[^a-zA-Z\-]/g, '');
    if (!cleanPath) {
      return null;
    }

    return cleanPath
      .split('-')
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }
}
