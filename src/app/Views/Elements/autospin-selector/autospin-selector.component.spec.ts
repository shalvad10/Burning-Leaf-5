import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutospinSelectorComponent } from './autospin-selector.component';

describe('AutospinSelectorComponent', () => {
  let component: AutospinSelectorComponent;
  let fixture: ComponentFixture<AutospinSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutospinSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutospinSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
