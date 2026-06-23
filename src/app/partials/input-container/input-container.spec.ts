import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContainer } from './input-container';

describe('InputContainer', () => {
  let component: InputContainer;
  let fixture: ComponentFixture<InputContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(InputContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
