import { Component, Output } from '@angular/core';
import { Deposit } from '../deposit/deposit';
import { AvailableFunds } from '../available-funds/available-funds';
import { TransactionHistory } from '../transaction-history/transaction-history';

@Component({
  selector: 'app-deposit-funds',
  imports: [Deposit, AvailableFunds, TransactionHistory],
  templateUrl: './deposit-funds.html',
  styleUrl: './deposit-funds.css',
})
export class DepositFunds {
  @Output() type: string = "Deposit";
}
