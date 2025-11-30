import { Component, input } from '@angular/core';

type BadgeVariant = 'success' | 'danger' | 'neutral';

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
  };

  tokens(): VariantTokens {
    return this.variantTokens[this.variant()] ?? this.variantTokens[this.defaultVariant];
  }
}
