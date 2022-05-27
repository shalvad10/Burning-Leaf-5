import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetBlockComponent } from './bet-block.component';

describe('BetBlockComponent', () => {
  let component: BetBlockComponent;
  let fixture: ComponentFixture<BetBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
