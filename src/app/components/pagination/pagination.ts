import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  // Inputs
  totalItems = input<number>(0);
  pageSize = input<number>(10);
  currentPage = input<number>(1);

  // Outputs
  pageChange = output<number>();

  // Helpers
  get totalPages(): number {
    const size = Math.max(1, this.pageSize() || 1);
    const total = Math.max(0, this.totalItems() || 0);
    return Math.max(1, Math.ceil(total / size));
  }

  canGoPrev(): boolean {
    return this.currentPage() > 1;
  }

  canGoNext(): boolean {
    return this.currentPage() < this.totalPages;
  }

  prev(): void {
    if (this.canGoPrev()) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  next(): void {
    if (this.canGoNext()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  goTo(input: string | number): void {
    const raw = typeof input === 'number' ? input : Number(input);
    if (Number.isNaN(raw)) return;
    const page = Math.min(Math.max(1, Math.trunc(raw)), this.totalPages);
    if (page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}
