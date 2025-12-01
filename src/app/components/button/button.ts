import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'neutral' | 'disabled';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  template: `
    <button 
      [title]="title()"
      [class]="getButtonClasses()"
      [type]="type()"
      [class.active]="isActive"
      [disabled]="variant() === 'disabled' || disabled()"
      (click)="onClick()"
      (mousedown)="setActive(true)"
      (mouseup)="setActive(false)"
      (mouseleave)="setActive(false)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.css',
})
export class Button {
  variant   = input<ButtonVariant>('primary');
  disabled  = input<boolean>(false);
  type      = input<string>('');
  title     = input<string>('');
  click     = output<void>();
  
  isActive: boolean = false;

  onClick(): void {
    if (this.variant() !== 'disabled' && !this.disabled()) {
      this.click.emit();
    }
  }

  setActive(active: boolean): void {
    this.isActive = active;
  }

  getButtonClasses(): string {
    const isDisabled = this.variant() === 'disabled' || this.disabled();

    const baseEnabled = 'grow px-4 py-2 rounded-md font-medium transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2';
    const baseDisabled = 'grow px-4 py-2 rounded-md font-medium cursor-not-allowed opacity-60';

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-primary text-white hover:bg-primary-hard hover:scale-105 focus:ring-primary',
      secondary: 'bg-secondary text-white hover:bg-secondary-dark hover:scale-105 focus:ring-secondary',
      danger: 'bg-danger text-white hover:bg-danger-dark hover:scale-105 focus:ring-danger',
      neutral: 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 focus:ring-gray-500',
      disabled: 'bg-gray-400 text-gray-600'
    };

    const activeRingByVariant: Record<Exclude<ButtonVariant, 'disabled'>, string> = {
      primary: 'ring-primary',
      secondary: 'ring-secondary',
      danger: 'ring-danger',
      neutral: 'ring-gray-500'
    };

    const activeClasses = this.isActive && !isDisabled
      ? `ring-2 ring-offset-2 ${activeRingByVariant[this.variant() as Exclude<ButtonVariant, 'disabled'>]}`
      : '';

    const base = isDisabled ? baseDisabled : baseEnabled;

    return `${base} ${variantClasses[this.variant()]} ${activeClasses}`;
  }
}
