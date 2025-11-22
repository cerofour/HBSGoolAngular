import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../button/button';
import { ModalContainer } from '../modal-container/modal-container';

@Component({
  selector: 'app-confirm-payment',
  imports: [Button, ModalContainer],
  templateUrl: './confirm-payment.html'
})
export class ConfirmPayment {
  @Input() imageSrc: string | ArrayBuffer | null = null;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }
}
