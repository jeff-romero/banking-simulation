import { Component, Input, OnInit } from '@angular/core';

import { TransferService } from '../services/transfer-service';
import { Transaction } from '../shared/models/transaction';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AccountService } from '../services/account-service';

@Component({
  selector: 'app-transaction-history',
  imports: [AsyncPipe],
  providers: [DatePipe],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnInit {
  UNSORTED: string = 'fa fa-sort';
  ASCENDING: string = 'fa fa-sort-asc';
  DESCENDING: string = 'fa fa-sort-desc';

  srcAccountNumSortedBy: string = this.UNSORTED;
  dstAccountNumSortedBy: string = this.UNSORTED;
  amountSortedBy: string = this.UNSORTED;
  typeSortedBy: string = this.UNSORTED;
  dateSortedBy: string = this.DESCENDING;

  @Input() type!:string;

  constructor(protected transferService: TransferService, private accountService: AccountService) {
    if (!this.accountService.isAuthenticated()) {
      return;
    }
  }

  ngOnInit(): void {
    this.transferService.updateTransactions(this.type);
  }
}
