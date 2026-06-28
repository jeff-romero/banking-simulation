import { Component, Input, OnInit, Output } from '@angular/core';
import { InputContainer } from '../partials/input-container/input-container';
import { TextInput } from '../partials/text-input/text-input';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { TransferService } from '../services/transfer-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transfer',
  imports: [InputContainer, TextInput, ReactiveFormsModule],
  providers: [DatePipe],
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

  constructor(private formBuilder: FormBuilder, private transferService: TransferService, private datePipe: DatePipe) {
    
  }

  ngOnInit() {
    this.transferLabel = 'Transfer To';
    this.transferPlaceholder = 'e.g. 1111111111';

    this.amountLabel = 'Amount';
    this.amountPlaceholder = 'Amount';

    this.transferForm = this.formBuilder.group({
      accountNum: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]]
    });
  }

  get formControl() {
    return this.transferForm.controls;
  }

  transfer() {
    this.attemptedTransfer = true;

    if (this.transferForm.invalid) {
      return;
    }

    let date = new Date();
    let dateStr = this.datePipe.transform(date, 'EEEE, MMMM d, y, HH:mm:ss zzzz');

    this.transferService.transferFunds({ 
      srcAccountNum: this.transferService.accountNumber,
      dstAccountNum: parseInt(this.formControl['accountNum'].value),
      type: 'Transfer',
      amount: parseInt(this.formControl['amount'].value),
      date: dateStr!
    }).subscribe(() => {


      this.attemptedTransfer = false;
    });
  }
}
