import { Component, OnInit } from '@angular/core';

import { TransferService } from '../services/transfer-service';
import { AccountService } from '../services/account-service';

@Component({
  selector: 'app-transaction-history',
  imports: [],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnInit {
  constructor(private transferService: TransferService) {

  }

  ngOnInit(): void {
    this.transferService.getTransactions(this.transferService.account.accountNumber);
  }

  sort(event: Event) {
    console.log(event);
  }
}
