import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonLinkVariant = 'primary' | 'secondary' | 'danger' | 'neutral' | 'disabled';

@Component({
  selector: 'app-button-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a 
      [routerLink]="variant() === 'disabled' ? '' :  routerLink()"
      [class]="getAllClasses()"
    >
      <ng-content></ng-content>
    </a>
  `,
  styleUrl: './button-link.css',
})
export class ButtonLink {
  routerLink = input.required<string | (string | number)[]>();
  variant = input<ButtonLinkVariant>('primary');
  fullWidth = input<boolean>(true);

  getButtonClasses(): string {
    const variantClasses: Record<ButtonLinkVariant, string> = {
      primary: 'bg-primary text-white hover:bg-primary-hard focus:ring-primary',
      secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary',
      danger: 'bg-danger text-white hover:bg-danger-dark focus:ring-danger',
      neutral: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
      disabled: 'bg-gray-400 text-gray-600'
    };

    return variantClasses[this.variant()];
  }

  getContainerClasses(): string {
    let baseClasses = 'block text-center px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none ';
    if (this.variant() !== 'disabled') baseClasses += 'focus:ring-2 focus:ring-offset-2';

    const widthClass = this.fullWidth() ? 'w-full' : 'w-auto inline-block';
    return `${baseClasses} ${widthClass}`;
  }

  getAllClasses(): string {
    return `${this.getButtonClasses()} ${this.getContainerClasses()}`;
  }
}

