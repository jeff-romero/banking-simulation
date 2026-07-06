import { Component } from '@angular/core';
import { Transfer } from '../transfer/transfer';
import { TransactionHistory } from '../transaction-history/transaction-history';

@Component({
  selector: 'app-withdraw-funds',
  imports: [Transfer, TransactionHistory],
  templateUrl: './withdraw-funds.html',
  styleUrl: './withdraw-funds.css',
})
export class WithdrawFunds {}
