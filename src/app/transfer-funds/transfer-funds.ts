import { Component } from '@angular/core';
import { TransactionHistory } from '../transaction-history/transaction-history';
import { Transfer } from '../transfer/transfer';

@Component({
  selector: 'app-transfer-funds',
  imports: [Transfer, TransactionHistory],
  templateUrl: './transfer-funds.html',
  styleUrl: './transfer-funds.css',
})
export class TransferFunds {
  constructor() {
    
  }
}
