import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent extends ComponentBase implements OnInit {

  @Input() modalData: any;

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  ngOnInit(): void {
  }

  onClick(action: string) {
    this.emitAction(action, {});
  }

}
