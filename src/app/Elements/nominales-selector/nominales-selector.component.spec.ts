import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalesSelectorComponent } from './nominales-selector.component';

describe('NominalesSelectorComponent', () => {
  let component: NominalesSelectorComponent;
  let fixture: ComponentFixture<NominalesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominalesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
