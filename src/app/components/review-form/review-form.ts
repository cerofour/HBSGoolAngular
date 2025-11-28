import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review/review.service';
import { ToastService } from '../../services/toast/toast.service';
import { AppStateService } from '../../services/app-state/app-state';

@Component({
	selector: 'app-review-form',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './review-form.html',
	styleUrls: ['./review-form.css']
})
export class ReviewFormComponent {
	form = null as any;

	sending = false;

	constructor(
		private fb: FormBuilder,
		private reviewService: ReviewService,
		private toast: ToastService,
		private appState: AppStateService
	) {}

		// Inicializar el form en ngOnInit para evitar uso de this.fb antes
		ngOnInit(): void {
			this.form = this.fb.group({
				rating: ['', [Validators.required]],
				comentario: ['', [Validators.maxLength(255)]]
			});
		}

	selectRating(value: number) {
		this.form.patchValue({ rating: String(value) });
	}

		isStarSelected(n: number): boolean {
			const val = this.form?.value?.rating;
			const r = Number(val);
			return !isNaN(r) && r >= n;
		}

	submit() {
		if (this.form.invalid) return;

		if (!this.appState.isLoggedIn()) {
			this.toast.error('No autorizado', 'Debes iniciar sesión para dejar una opinión.');
			return;
		}

		this.sending = true;

		const payload = {
			rating: String(this.form.value.rating),
			comentario: this.form.value.comentario || ''
		};

		this.reviewService.create(payload).subscribe({
			next: () => {
				this.toast.success('¡Gracias!', 'Tu opinión fue enviada correctamente.');
				this.form.reset();
				this.sending = false;
			},
			error: (err) => {
				const msg = err?.error?.message || 'No se pudo enviar la opinión. Intenta más tarde.';
				this.toast.error('Error', msg);
				this.sending = false;
			}
		});
	}
}

