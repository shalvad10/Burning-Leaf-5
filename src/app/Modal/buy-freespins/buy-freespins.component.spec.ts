import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFreespinsComponent } from './buy-freespins.component';

describe('BuyFreespinsComponent', () => {
  let component: BuyFreespinsComponent;
  let fixture: ComponentFixture<BuyFreespinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyFreespinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyFreespinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
