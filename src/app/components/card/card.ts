import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLink } from '../button-link/button-link';
import { CanchaInfo } from '../../schemas/cancha';

@Component({
  selector: 'app-cancha-card',
  standalone: true,
  imports: [CommonModule, ButtonLink],
  templateUrl: 'card.html',
  styleUrl: './card.css',
})
export class CanchaCard {
  canchaInfo = input.required<CanchaInfo>();

  getStateBadgeClasses(): string {
    const state = this.canchaInfo().canchaState.toLowerCase();
    switch (state) {
      case 'd':
        return 'bg-green-100 text-green-800';

      case 'm':
        return 'bg-yellow-100 text-yellow-800';

      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}

