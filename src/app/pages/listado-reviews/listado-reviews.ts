import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppTable } from '../../components/table/table';
import { Pagination } from '../../components/pagination/pagination';
import { Button } from '../../components/button/button';

import { ReviewService } from '../../services/review/review.service';
import { Review } from '../../schemas/review';

@Component({
  selector: 'app-listado-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, AppTable, Pagination, Button],
  templateUrl: './listado-reviews.html',
})
export class ListadoReviews implements OnInit {
  private reviewService = inject(ReviewService);

  reviews: Review[] = [];

  cargando = false;
  errorMsg: string | null = null;

  usuarioId?: number;
  rating: string = '';
  fechaDesde?: string;
  fechaHasta?: string;

  page = 1;
  pageSize = 20;
  totalElements = 0;
  totalPages = 1;

  ngOnInit(): void {
    this.loadPage(this.page);
  }

  filtrar(): void {
    this.page = 1;
    this.loadPage(this.page);
  }

  loadPage(page: number): void {
    this.cargando = true;
    this.errorMsg = null;

    const filtros: any = {
      usuarioId: this.usuarioId || undefined,
      rating: this.rating || undefined,
      fechaDesde: this.fechaDesde || undefined,
      fechaHasta: this.fechaHasta || undefined,
    };

    this.reviewService.getListadoReviews(page, filtros).subscribe({
      next: (resp) => {
        this.reviews = resp.content ?? [];
        this.totalElements = resp.totalElements ?? 0;
        this.pageSize = resp.size ?? this.pageSize;
        this.totalPages = resp.totalPages ?? 1;

        this.page = (resp.number ?? (page - 1)) + 1;

        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se pudo obtener el listado de opiniones.';
        this.cargando = false;
      },
    });
  }


  onPageChange(p: number): void {
    if (p !== this.page) {
      this.loadPage(p);
    }
  }
}
