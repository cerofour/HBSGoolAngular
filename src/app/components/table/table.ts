import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200 text-left">
        <thead class="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
          <ng-content select="[table-header]"></ng-content>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white text-sm text-gray-700">
          <ng-content select="[table-body]"></ng-content>
        </tbody>
      </table>
    </div>
  `,
})
export class AppTable {}

