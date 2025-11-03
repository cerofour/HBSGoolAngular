import { Component } from '@angular/core';

import { CANCHAS_EJEMPLO } from '../../components/card/card.example';
import { HeroSection } from './hero-section';
import { CanchasSection } from './canchas-section';
import { InfoContactHero } from './info-contact-hero';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, CanchasSection, InfoContactHero],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  canchas = CANCHAS_EJEMPLO;
}
