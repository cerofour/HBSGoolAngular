import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppTable } from '../../components/table/table';
import { Pagination } from '../../components/pagination/pagination';
import { Button } from '../../components/button/button';

import { UserService } from '../../services/users/user.service';
import { User } from '../../schemas/user';

@Component({
  selector: 'app-listado-users',
  standalone: true,
  imports: [CommonModule, FormsModule, AppTable, Pagination, Button],
  templateUrl: './listado-users.html',
})
export class ListadoUsers implements OnInit {
  private userService = inject(UserService);

  users: User[] = [];

  cargando = false;
  errorMsg: string | null = null;

  name: string = '';
  dni: string = '';
  active: string = '';

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
      page: page - 1,
      size: 20,
      sort: "userId",
      name: this.name || undefined,
      dni: this.dni || undefined,
      active: this.active || undefined,
    };

    this.userService.getListadoUsers(filtros).subscribe({
      next: (resp) => {
        this.users = resp.content;
        /*
        this.totalElements = resp.totalElements ?? 0;
        this.pageSize = resp.size ?? this.pageSize;
        this.totalPages = resp.totalPages ?? 1;

        this.page = resp.number + 1

        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se pudo obtener el listado de usuarios.';
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
