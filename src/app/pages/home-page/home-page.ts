import { Component, inject } from '@angular/core';

import { HeroSection } from './hero-section';
import { CanchasSection } from './canchas-section';
import { InfoContactHero } from './info-contact-hero';
import { CanchaService } from '../../services/cancha/cancha.service';
import { CanchaInfo } from '../../schemas/cancha';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, CanchasSection, InfoContactHero],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private canchaService = inject(CanchaService);
  canchas: CanchaInfo[] = []; 

  ngOnInit() {
    this.canchaService.getAllCanchas().subscribe({
      next: (canchas) => this.canchas = canchas,
      error: () => {}
    });
  }

}
