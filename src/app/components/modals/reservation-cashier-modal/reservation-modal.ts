import { Component, computed, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { Button } from '../../button/button';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalContainer } from '../modal-container/modal-container';
import { ReservationFormCashier, ReservationFormUser } from '../../../services/reservation/reservation.service';
import { combineDateAndTime, getPostgresInterval, getDate, getTime } from '../../../utils/general-utils';
import { CanchaInfo, CanchaService } from '../../../services/cancha/cancha.service';

export type modalType = 'user' | 'cashier';

@Component({
  selector: 'app-reservation-modal',
  imports: [CommonModule, FormsModule, Button, ModalContainer],
  templateUrl: './reservation-modal.html'
})
export class ReservationModal {
  @Input() modalType: modalType = 'user';
  @Input() data!: (ReservationFormCashier | ReservationFormUser) & { availableHours?: string[] };
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<(ReservationFormCashier | ReservationFormUser) & { totalPrice?: number }>()

  form!: FormGroup;
  canchas: CanchaInfo[] = [];
  totalPrice = signal(0);
  formattedDate = computed(() => getDate(this.data.tiempoInicio));
  formattedTime = computed(() => getTime(this.data.tiempoInicio));

  @ViewChild('reservationForm') reservationForm!: NgForm;

  private canchaService = inject(CanchaService);

  ngOnInit() {
    this.canchaService.getAllCanchas().subscribe({ next: (data) => { this.canchas = data } });
  }

  calculateTotalPrice(): number {
    const cancha: CanchaInfo | undefined = this.canchas.find((e) => e.canchaId == this.data.canchaId);

    if (cancha === undefined) return 0;

    const precieHour: number = cancha.hourlyPrice;

    if (!this.data.tiempoInicio || !this.data.duracion) {
      return 0;
    }

    const inicio = new Date(`1970-01-01T${getTime(this.data.tiempoInicio)}`);
    const fin = new Date(`1970-01-01T${this.data.duracion}:00`);

    const horas = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);

    return horas > 0 ? horas * precieHour : 0;

  }

  confirm() {

    if (!this.reservationForm.valid) return;

    const startTime: Date = new Date(this.data.tiempoInicio);
    this.data.duracion = getPostgresInterval(startTime, combineDateAndTime(startTime, this.data.duracion));
    delete this.data.availableHours;
    const newData = { ...this.data, totalPrice: this.totalPrice() };
    this.onConfirm.emit(newData);
  }

}
