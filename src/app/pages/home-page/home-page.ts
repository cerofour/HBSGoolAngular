import { Component, inject, OnInit, OnDestroy } from '@angular/core';

import { HeroSection } from './hero-section';
import { CanchasSection } from './canchas-section';
import { InfoContactHero } from './info-contact-hero';
import { CanchaInfo, CanchaService } from '../../services/cancha/cancha.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, CanchasSection, InfoContactHero],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit, OnDestroy {
  private canchaService = inject(CanchaService);
  canchas: CanchaInfo[] = [];
  private subs = new Subscription();

  ngOnInit() {
    // carga inicial
    this.subs.add(
      this.canchaService.getAllCanchas().subscribe({
        next: (canchas) => (this.canchas = canchas ?? []),
        error: () => {}
      })
    );

    // recargar cuando el servicio emita un cambio (p. ej. después de un PATCH)
    this.subs.add(this.canchaService.refresh$.subscribe(() => {
      this.canchaService.getAllCanchas().subscribe({
        next: (canchas) => (this.canchas = canchas ?? []),
        error: () => {}
      });
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
