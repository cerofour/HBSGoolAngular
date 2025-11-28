import { Component, input, model } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  template: `
    <div class="w-full flex flex-col gap-1">
      @if (label()) {
        <label [for]="id()" class="text-sm font-medium text-gray-700">{{ label() }}</label>
      }
      @if (control(); as formControl) {
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [formControl]="formControl"
          [attr.maxlength]="maxlength()"
          [attr.minlength]="minlength()"
          [disabled]="disabled()"
          class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400
                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-colors duration-200"
        />
      } @else if (inGroupName()) {
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [formControlName]="inGroupName()"
          [attr.maxlength]="maxlength()"
          [attr.minlength]="minlength()"
          [disabled]="disabled()"
          class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400
                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-colors duration-200"
        />
      } @else {
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [value]="value()"
          [disabled]="disabled()"
          (input)="onInput($event)"
          [attr.maxlength]="maxlength()"
          [attr.minlength]="minlength()"
          class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400
                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-colors duration-200"
        />
      }

      @if (hint() && hint().length > 0) {
        <div class="text-xs text-gray-500">{{ hint() }}</div>
      }
    </div>
  `,
  styleUrl: './input.css',
})
export class MyInput {
  label 		  = input<string>('');
  id 			    = input<string>(`input-${Math.random().toString(36).slice(2)}`);
  type 			  = input<string>('text');
  placeholder	= input<string>('');
  hint 			  = input<string>('');
  maxlength = input<number | null>(null);
  minlength = input<number | null>(null);
  disabled    = input<boolean>(false);

  control 		= input<FormControl | null>(null);
  inGroupName = input<string>('');

  value = model<string>('');

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}
