import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() titre: string = 'Modal';
  @Input() contenu: string = 'Contenu de la modal';
  @Input() afficherModal: boolean = false;

  @Output() confirmer: EventEmitter<void> = new EventEmitter<void>();

  fermerModal(): void {
    this.afficherModal = false;
  }
}

