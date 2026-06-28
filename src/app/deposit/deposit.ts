import { Component, OnInit, Output } from '@angular/core';
import { TextInput } from '../partials/text-input/text-input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TransferService } from '../services/transfer-service';

@Component({
  selector: 'app-deposit',
  imports: [TextInput, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './deposit.html',
  styleUrl: './deposit.css',
})
export class Deposit implements OnInit {
  @Output() amountLabel!: string;
  @Output() amountPlaceholder!: string;
  depositForm!: FormGroup;
  attemptedDeposit: boolean = false;

  constructor(private formBuilder: FormBuilder, private transferService: TransferService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.amountLabel = 'Amount';
    this.amountPlaceholder = 'Amount';

    this.depositForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]]
    });
  }

  get formControl() {
    return this.depositForm.controls;
  }

  deposit() {
    this.attemptedDeposit = true;

    if (this.depositForm.invalid) {
      return;
    }

    let date = new Date();
    let dateStr = this.datePipe.transform(date, 'EEEE, MMMM d, y, HH:mm:ss zzzz');

    this.transferService.transferFunds({ 
      srcAccountNum: this.transferService.accountNumber,
      dstAccountNum: this.transferService.accountNumber,
      type: 'Deposit',
      amount: parseInt(this.formControl['amount'].value),
      date: dateStr!
    }).subscribe(() => {
      this.attemptedDeposit = false;
    });
  }
}
