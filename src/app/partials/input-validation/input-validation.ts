import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES: any = {
  required: 'Input required',
  email: 'Invalid email',
  pattern: 'Invalid format',
  accountNum: 'Invalid account number format',
  amount: 'Invalid amount',
};

@Component({
  selector: 'input-validation',
  imports: [],
  templateUrl: './input-validation.html',
  styleUrl: './input-validation.css',
})
export class InputValidation implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrors: boolean = true;
  errorMessages: string[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.validate();
    });

    this.control.valueChanges.subscribe(() => {
      this.validate();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validate();
  }

  validate() {
    let errors = this.control.errors;

    if (!errors) {
      this.errorMessages = [];
      return;
    }

    let errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATOR_MESSAGES[key]);
  }
}
