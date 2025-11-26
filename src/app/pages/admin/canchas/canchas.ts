import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanchaCard } from '../../../components/card/card';
import { CanchaService, CanchaInfo } from '../../../services/cancha/cancha.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-canchas',
  standalone: true,
  imports: [CommonModule, CanchaCard],
  templateUrl: './canchas.html'
})
export class AdminCanchasPage implements OnInit, OnDestroy {
  canchas: CanchaInfo[] = [];
  private subs = new Subscription();

  constructor(private canchaService: CanchaService, private router: Router) {}

  ngOnInit(): void {
    // carga inicial
    this.loadCanchas();

    // cuando navegamos de vuelta desde la pantalla de edición es posible que
    // el componente siga montado; por eso escuchamos NavigationEnd y recargamos
    // la lista cuando la ruta activa es /admin/canchas
    this.subs.add(
      this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) {
          if (ev.urlAfterRedirects && ev.urlAfterRedirects.includes('/admin/canchas')) {
            this.loadCanchas();
          }
        }
      })
    );

    // Suscribirse a notificaciones de cambio en el servicio (ej. después de un PATCH)
    this.subs.add(this.canchaService.refresh$.subscribe(() => this.loadCanchas()));
  }

  ngOnDestroy(): void {
  this.subs.unsubscribe();
  }

  loadCanchas() {
    this.canchaService.getAllCanchas().subscribe({
      next: (list) => this.canchas = list ?? [],
      error: () => this.canchas = []
    });
  }
}
