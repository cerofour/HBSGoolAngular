import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-reminder-card',
  imports: [],
  templateUrl: './payment-reminder-card.html'
})
export class PaymentReminderCard {
  @Input({ required: true}) totalPrice!: number

}
