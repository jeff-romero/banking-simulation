import { Component, Input, OnInit, Output } from '@angular/core';
import { InputContainer } from '../partials/input-container/input-container';
import { TextInput } from '../partials/text-input/text-input';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { TransferService } from '../services/transfer-service';

@Component({
  selector: 'app-transfer',
  imports: [InputContainer, TextInput, ReactiveFormsModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css',
})
export class Transfer implements OnInit {
  @Output() transferLabel!: string;
  @Output() transferPlaceholder!: string;
  @Output() amountLabel!: string;
  @Output() amountPlaceholder!: string;
  transferForm!:FormGroup;
  attemptedTransfer: boolean = false;

  constructor(private formBuilder: FormBuilder, private transferService: TransferService) {
    
  }

  ngOnInit() {
    this.transferLabel = 'Transfer To';
    this.transferPlaceholder = 'Account Number';

    this.amountLabel = 'Amount';
    this.amountPlaceholder = 'Amount';

    this.transferForm = this.formBuilder.group({
      accountNum: ['', [Validators.required]],
      amount: ['', Validators.required]
    });
  }

  get formControl() {
    return this.transferForm.controls;
  }

  transfer() {
    this.transferService.transferFunds({ 
      accountNum: this.formControl['accountNum'].value,
      amount: this.formControl['amount']
    }).subscribe(() => {
      
    });
  }
}
