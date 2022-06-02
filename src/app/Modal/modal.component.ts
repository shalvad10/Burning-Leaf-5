import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from '../Base/ComponentBase';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends ComponentBase implements OnInit {

  @Input() data: any;
  
  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
  }
  
  public get modal() {
    return this.data.modal;
  }
  public get activeModal() {
    return this.modal[this.modal.currentModal]
  }

  close() {
    this.emitAction('toggleModal', { modal: '', data: undefined})
  }

}
