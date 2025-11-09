import { Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-reservation-page',
  imports: [ReservationSummary, Calendar, QrPaymentCard, TransferPaymentCard, PaymentReminderCard, ConfirmPayment, Button],
  templateUrl: './reservation-page.html'
})
export class ReservationPage {

  confirmed = signal(false);
  showModalConfirmed = signal(false);

  selectedImage: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  reservationData = signal<(ReservationFormUser | ReservationFormCashier) & {totalPrice?: number} | null>(null);
  paymentAmount = signal<number>(0);

  canchaId!: number;
  rol?: string;

  private appState = inject(AppStateService);
  private reservationService = inject(ReservationService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.canchaId = Number(this.route.snapshot.paramMap.get('canchaId'));
    this.rol = this.appState.getUserProfile()?.rol;
  }

  handleReservationConfirmed(data: ReservationFormUser | ReservationFormCashier) {
    console.log(data);
    this.reservationData.set(data);
    this.confirmed.set(true);

    this.paymentAmount.set(0);
    this.selectedImage = null;
    this.previewImage = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
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
    if(this.rol === undefined) return;

    if (this.reservationData() !== null && this.selectedImage !== null) {
      //TODO: arreglar ReservationFormCashier y ReservationFormUser
      if(this.rol === 'ROLE_CASHIER')
        this.reservationService.creationReservationAsCashier(this.reservationData() as ReservationFormCashier, this.selectedImage).subscribe();
      else if (this.rol === 'ROLE_USER')
        this.reservationService.creationReservationAsUser(this.reservationData() as ReservationFormUser, this.selectedImage).subscribe();
    }
    
  }

  private resetReservationFlow() {
    this.confirmed.set(false);
    this.showModalConfirmed.set(false);
    this.reservationData.set(null);
    this.paymentAmount.set(0);
    this.selectedImage = null;
    this.previewImage = null;
  }


}
