import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidation } from './input-validation';

describe('InputValidation', () => {
  let component: InputValidation;
  let fixture: ComponentFixture<InputValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputValidation],
    }).compileComponents();

    fixture = TestBed.createComponent(InputValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
