import { Component, input } from '@angular/core';

type BadgeVariant = 'success' | 'danger' | 'neutral' | 'warning';

interface VariantTokens {
  containerClass: string;
  iconWrapperClass: string;
  iconStroke: string;
  paths: string[];
}

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  label = input<string>('');
  variant = input<BadgeVariant>('neutral');

  private readonly baseContainerClass =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset';

  private readonly baseIconWrapperClass = 'flex h-5 w-5 items-center justify-center rounded-full';

  private readonly defaultVariant: BadgeVariant = 'neutral';

  private readonly variantTokens: Record<BadgeVariant, VariantTokens> = {
    success: {
      containerClass: `${this.baseContainerClass} bg-emerald-50 text-emerald-700 ring-emerald-600/20`,
      iconWrapperClass: `${this.baseIconWrapperClass} bg-emerald-500/10 text-emerald-600`,
      iconStroke: 'currentColor',
      paths: ['M5 13l4 4L19 7'],
    },
    danger: {
      containerClass: `${this.baseContainerClass} bg-rose-50 text-rose-700 ring-rose-600/20`,
      iconWrapperClass: `${this.baseIconWrapperClass} bg-rose-500/10 text-rose-600`,
      iconStroke: 'currentColor',
      paths: ['M6 6l12 12', 'M6 18l12-12'],
    },
    neutral: {
      containerClass: `${this.baseContainerClass} bg-slate-50 text-slate-700 ring-slate-500/20`,
      iconWrapperClass: `${this.baseIconWrapperClass} bg-slate-500/10 text-slate-600`,
      iconStroke: 'currentColor',
      paths: ['M12 8h.01', 'M12 12v4'],
    },
    warning: {
      containerClass: `${this.baseContainerClass} bg-orange-50 text-orange-700 ring-orange-600/20`,
      iconWrapperClass: `${this.baseIconWrapperClass} bg-orange-500/10 text-orange-600`,
      iconStroke: 'currentColor',
      paths: ['M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'],
    },
  };

  tokens(): VariantTokens {
    return this.variantTokens[this.variant()] ?? this.variantTokens[this.defaultVariant];
  }
}
