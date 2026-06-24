import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositFunds } from './deposit-funds';

describe('DepositFunds', () => {
  let component: DepositFunds;
  let fixture: ComponentFixture<DepositFunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositFunds],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositFunds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
