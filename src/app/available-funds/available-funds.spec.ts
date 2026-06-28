import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFunds } from './available-funds';

describe('AvailableFunds', () => {
  let component: AvailableFunds;
  let fixture: ComponentFixture<AvailableFunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableFunds],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableFunds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
