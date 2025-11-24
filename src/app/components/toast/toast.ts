import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export const toastDuration = 4500; // Modificar tambien en el toast.css (+ 250ms)

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      const newToasts = toasts.filter(newToast => !this.toasts.some(oldToast => oldToast.id === newToast.id));
      this.toasts = toasts;

      newToasts.forEach(toast => {
        setTimeout(() => {
          this.removeToast(toast.id);
        }, toastDuration);
      });
    });
  }

  removeToast(id: string): void {
    const toast = this.toasts.find(t => t.id === id);
    if (toast) this.toastService.remove(id);
  }

  getToastClasses(type: ToastType): string {
    const baseClasses = 'bg-white/95 border-[var(--color-border-stroke)]';
    
    switch (type) {
      case 'success':
        return `${baseClasses} text-[var(--color-secondary)]`;
      case 'error':
        return `${baseClasses} text-[var(--color-danger)]`;
      case 'warning':
        return `${baseClasses} text-orange-600`;
      case 'info':
        return `${baseClasses} text-[var(--color-primary)]`;
      default:
        return baseClasses;
    }
  }

  
}