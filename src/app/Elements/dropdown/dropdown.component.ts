import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {


  selected!: number;
  items!: number[];
  showDropdown = false;

  @ViewChild('block') block!: ElementRef;

  constructor() { }

  @Input() set allElements(val: number[]) {
    this.items = val;
    if ( this.selected == undefined) {
      this.selected = val[0];
    }
  }

  @Input() set selectedItem(val: number) {
    this.selected = val;
  }

  ngOnInit(): void {
  }

  toggleBlock(): void {
    this.showDropdown = !this.showDropdown;
    this.block.nativeElement.classList.toggle('rotated');
  }

}
