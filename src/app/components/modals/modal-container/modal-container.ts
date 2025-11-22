import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  imports: [],
  templateUrl: './modal-container.html'
})
export class ModalContainer {
  @Input() title: string = '';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
}
