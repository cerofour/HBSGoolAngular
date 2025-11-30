import { Component, computed, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { Button } from '../../button/button';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalContainer } from '../modal-container/modal-container';
import { ReservationFormCashier, ReservationFormUser } from '../../../services/reservation/reservation.service';
import { combineDateAndTime, getPostgresInterval, getDate, getTime } from '../../../utils/general-utils';
import { CanchaInfo } from '../../../services/cancha/cancha.service';

export type modalType = 'user' | 'cashier';

@Component({
  selector: 'app-reservation-modal',
  imports: [CommonModule, FormsModule, Button, ModalContainer],
  templateUrl: './reservation-modal.html'
})
export class ReservationModal {
  @ViewChild('reservationForm') reservationForm!: NgForm;
  @Input() startTime!: string;
  @Input() cancha!: CanchaInfo;
  @Input() availableHours: string[] = [];
  @Input() modalType: modalType = 'user';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<(ReservationFormCashier | ReservationFormUser) & { totalPrice?: number }>()

  form!: FormGroup;
  duracion: string = '';
  medioPago: string = '';
  dni: string = '';
  totalPrice = signal(0);
  formattedDate = computed(() => getDate(this.startTime));
  formattedTime = computed(() => getTime(this.startTime));


  calculateTotalPrice(): number {
    if (this.cancha === undefined) return 0;

    const precieHour: number = this.cancha.hourlyPrice;

    if (!this.startTime || !this.duracion) return 0;

    const inicio = new Date(`1970-01-01T${getTime(this.startTime)}`);
    const fin = new Date(`1970-01-01T${this.duracion}:00`);

    const horas = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);

    return horas > 0 ? horas * precieHour : 0;

  }

  confirm() {

    if (!this.reservationForm.valid) return;

    const startTime: Date = new Date(this.startTime);
    this.duracion = getPostgresInterval(startTime, combineDateAndTime(startTime, this.duracion));

    let newData;

    if(this.modalType === 'cashier') newData = this.createCashierData();
    else newData = this.createUserData();

    newData = { ...newData, totalPrice: this.totalPrice() };
    
    this.onConfirm.emit(newData);
  }

  private createUserData(): ReservationFormUser {
    return {
      canchaId: this.cancha.canchaId,
      tiempoInicio: this.startTime,
      dni: this.dni,
      duracion: this.duracion,
      montoInicial: 0,
      medioPago: 'REMOTO',
    }
  }

  private createCashierData(): ReservationFormCashier {
    return {
      canchaId: this.cancha.canchaId,
      tiempoInicio: this.startTime,
      dni: this.dni,
      duracion: this.duracion,
      medioPago: this.medioPago
    }
  }
}

