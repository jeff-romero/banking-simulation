import { Component, Output } from '@angular/core';
import { TransactionHistory } from '../transaction-history/transaction-history';
import { AvailableFunds } from '../available-funds/available-funds';
import { Withdraw } from '../withdraw/withdraw';

@Component({
  selector: 'app-withdraw-funds',
  imports: [Withdraw, AvailableFunds, TransactionHistory],
  templateUrl: './withdraw-funds.html',
  styleUrl: './withdraw-funds.css',
})
export class WithdrawFunds {
  @Output() type: string = 'Withdrawal';
}
