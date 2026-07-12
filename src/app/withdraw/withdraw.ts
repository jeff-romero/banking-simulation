import { Component, OnInit, Output } from '@angular/core';
import { TextInput } from '../partials/text-input/text-input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TransferService } from '../services/transfer-service';

@Component({
  selector: 'app-withdraw',
  imports: [TextInput, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './withdraw.html',
  styleUrl: './withdraw.css',
})
export class Withdraw implements OnInit {
  @Output() amountLabel!: string;
  @Output() amountPlaceholder!: string;
  withdrawalForm!: FormGroup;
  attemptedWithdrawal: boolean = false;

  constructor(private formBuilder: FormBuilder, private transferService: TransferService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.amountLabel = 'Amount';
    this.amountPlaceholder = 'Amount';

    this.withdrawalForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]]
    });
  }

  get formControl() {
    return this.withdrawalForm.controls;
  }

  withdraw() {
    this.attemptedWithdrawal = true;

    if (this.withdrawalForm.invalid) {
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
      this.attemptedWithdrawal = false;
    });
  }
}
