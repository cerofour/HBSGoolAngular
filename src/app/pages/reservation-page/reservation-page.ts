import { Component, inject, signal, ViewChild } from '@angular/core';
import { ReservationSummary } from "../../components/reservation-summary/reservation-summary";
import { Calendar } from "../../components/calendar/calendar";
import { QrPaymentCard } from '../../components/cards/qr-payment-card/qr-payment-card';
import { TransferPaymentCard } from '../../components/cards/transfer-payment-card/transfer-payment-card';
import { PaymentReminderCard } from '../../components/cards/payment-reminder-card/payment-reminder-card';
import { ConfirmPayment } from '../../components/modals/confirm-payment/confirm-payment';
import { ReservationFormCashier, ReservationFormUser, ReservationService } from '../../services/reservation/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Button } from '../../components/button/button';
import { AppStateService } from '../../services/app-state/app-state';
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-page',
  imports: [ReservationSummary, Calendar, QrPaymentCard, TransferPaymentCard, PaymentReminderCard, ConfirmPayment, Button, FormsModule, CommonModule],
  templateUrl: './reservation-page.html'
})
export class ReservationPage {
  @ViewChild('paymentForm') paymentForm!: NgForm;
  private appState = inject(AppStateService);
  private reservationService = inject(ReservationService);
  private route = inject(ActivatedRoute);

  confirmed = signal(false);
  showModalConfirmed = signal(false);

  selectedImage: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  reservationData = signal<(ReservationFormUser | ReservationFormCashier) & { totalPrice?: number } | null>(null);
  paymentAmount: number = 0;
  minPaymentAmount = signal(0);
  maxPaymentAmount = signal(0);

  rol?: string | undefined;

  canchaId!: number;

  ngOnInit() {
    this.rol = this.appState.getUserProfile()?.rol ?? 'CASHIER';
    this.canchaId = Number(this.route.snapshot.paramMap.get('canchaId'));
  }

  handleReservationConfirmed(data: (ReservationFormUser | ReservationFormCashier) & { totalPrice?: number }) {
    this.reservationData.set(data);
    this.confirmed.set(true);

    const totalPrice = data.totalPrice ?? 0;
    this.minPaymentAmount.set(totalPrice / 2);
    this.maxPaymentAmount.set(totalPrice);

    this.paymentAmount = 0;
    this.selectedImage = null;
    this.previewImage = null;
  }

  isPaymentAmountValid(): boolean {
    return this.paymentAmount >= this.minPaymentAmount() &&
      this.paymentAmount <= this.maxPaymentAmount() &&
      this.paymentAmount > 0;
  }

  getPaymentError(): string {
    if (!this.paymentForm?.submitted) return '';

    if (this.paymentAmount === 0) {
      return 'Debes ingresar un monto';
    }

    if (this.paymentAmount < this.minPaymentAmount()) {
      return `El monto debe ser al menos S/.${this.minPaymentAmount().toFixed(2)}`;
    }

    if (this.paymentAmount > this.maxPaymentAmount()) {
      return `El monto no puede ser mayor a S/.${this.maxPaymentAmount().toFixed(2)}`;
    }

    return '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!this.isPaymentAmountValid()) {
      alert(this.getPaymentError() || 'Por favor ingresa un monto válido');
      input.value = '';
      return;
    }

    if (input.files && input.files.length > 0) {

      this.selectedImage = input.files[0];

      if (!this.selectedImage.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }

      const reader = new FileReader();

      reader.onload = (_) => {
        this.previewImage = reader.result;
        this.showModalConfirmed.set(true);
      };

      reader.readAsDataURL(this.selectedImage);

    } else {
      this.showModalConfirmed.set(false);
    }

  }

  openFileInput(input: HTMLInputElement) {
    input.click();
  }

  closeModal() {
    this.showModalConfirmed.set(false);
    this.selectedImage = null;
    this.previewImage = null;
  }

  handlePaymentUploaded() {
    //if(this.rol === undefined) return
    this.rol = 'CASHIER'; //test

    if (this.reservationData() !== null) {
      if (this.rol === 'CASHIER')
        this.reservationService.creationReservationAsCashier(this.reservationData() as ReservationFormCashier, this.selectedImage).subscribe();
      else if (this.rol === 'USER' && this.selectedImage !== null)
        this.reservationService.creationReservationAsUser(this.reservationData() as ReservationFormUser, this.selectedImage).subscribe();
    }

    this.resetReservationFlow();
  }

  private resetReservationFlow() {
    this.confirmed.set(false);
    this.showModalConfirmed.set(false);
    this.reservationData.set(null);
    this.paymentAmount = 0;
    this.selectedImage = null;
    this.previewImage = null;
  }


}
