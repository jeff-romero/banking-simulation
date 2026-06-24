import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainer } from '../input-container/input-container';
import { InputValidation } from '../input-validation/input-validation';

@Component({
  selector: 'text-input',
  imports: [InputContainer, InputValidation, ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput implements OnInit {
  @Input() control!: AbstractControl;
  @Input() showErrors: boolean = true;
  @Input() label!: string;
  @Input() type: 'text' | 'password' | 'email' = 'text';

  constructor() {

  }

  ngOnInit(): void {
    
  }

  get formControl() {
    return this.control as FormControl;
  }
}
