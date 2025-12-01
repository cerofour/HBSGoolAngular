import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CanchaService } from '../../../../services/cancha/cancha.service';
import { CanchaInfo } from '../../../../schemas/cancha';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs';
import { Button } from '../../../../components/button/button';
import { ButtonLink } from '../../../../components/button-link/button-link';

@Component({
  selector: 'app-actualizar-cancha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, BreadcrumbsComponent, Button, ButtonLink],
  templateUrl: './update-cancha.html',
  styleUrls: ['./update-cancha.css']
})
export class ActualizarCanchaComponent implements OnInit {

  form!: FormGroup;
  loading = true;
  btnLoading = false;
  error: string | null = null;
  id!: number;
  canchas: CanchaInfo[] = [];
  hasId = false;

  constructor(
    private fb: FormBuilder,
    private canchaService: CanchaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
  this.id = idParam ? Number(idParam) : NaN;
  this.hasId = !isNaN(this.id);

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precioHora: [0, [Validators.required, Validators.min(1)]],
      estadoCancha: ['', Validators.required]
    });

    if (this.hasId) {
      this.cargarDatos();
    } else {
      // cargar lista de canchas para mostrar las cards en la vista de actualización
      this.canchaService.getAllCanchas().subscribe({
        next: (c) => {
          this.canchas = c ?? [];
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudieron cargar las canchas.';
          this.loading = false;
        }
      });
    }
  }

  cargarDatos() {
    this.canchaService.obtenerCanchaPorId(this.id).subscribe({
      next: (cancha: CanchaInfo) => {
        this.form.patchValue({
          nombre: cancha.name ?? '',
          descripcion: cancha.description ?? '',
          precioHora: cancha.hourlyPrice ?? 0,
          estadoCancha: 'Disponible'
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar los datos.';
        this.loading = false;
      }
    });
  }

  actualizarCancha() {
    if (this.form.invalid) return;

    this.btnLoading = true;

    const payload: Partial<CanchaInfo> = {
      name: this.form.value.nombre,
      description: this.form.value.descripcion,
      hourlyPrice: this.form.value.precioHora,
      canchaState: this.form.value.estadoCancha,
    };

    // Enviar tanto claves en inglés como en español para compatibilidad con
    // distintos formatos del backend (evita que la API ignore campos si
    // espera nombres en español).
    const payloadCompat: any = {
      // inglés (shape interno)
      ...payload,
      // español (posible shape del backend)
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precioHora: this.form.value.precioHora,
      estadoCancha: this.form.value.estadoCancha,
    };

    if (isNaN(this.id)) {
      this.error = 'ID de cancha no proporcionado. Usa la ruta /admin/canchas/actualizar/:id o abre la página desde el listado.';
      this.btnLoading = false;
      return;
    }

    this.canchaService.actualizarCancha(this.id, payloadCompat).subscribe({
      next: () => {
        this.router.navigate(['/admin/canchas']);
      },
      error: () => {
        this.error = 'Error al actualizar la cancha';
        this.btnLoading = false;
      }
    });
  }
}
