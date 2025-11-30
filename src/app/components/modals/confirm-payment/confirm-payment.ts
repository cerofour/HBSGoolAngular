import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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

  isProcessing = signal(false);
  
  ngOnInit() {
    if (!this.imageSrc) this.onClose.emit();
  }

  confirm() {
    if(this.isProcessing()) return;
    this.isProcessing.set(true);
    this.onConfirm.emit();
  }
}
