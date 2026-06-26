import { Component, OnInit } from '@angular/core';

import { TransferService } from '../services/transfer-service';
import { Transaction } from '../shared/models/transaction';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transaction-history',
  imports: [KeyValuePipe, AsyncPipe],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnInit {
  transactions: Transaction[] = [];
  transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);

  constructor(private transferService: TransferService) {
  }

  ngOnInit(): void {
    this.transferService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.transactions = transactions;
        this.transactionsSubject.next(this.transactions);
      },
      error: (errorResponse: any) => {
        console.log(`Could not retrieve transaction!: ${errorResponse}`);
      }
    });
  }

  sort(event: Event) {
    console.log(event);
  }

  sortSrcAccountNum(): void {

  }

  sortDstAccountNum(): void {

  }

  sortAmount(): void {

  }

  sortType(): void {

  }

  sortDate(): void {
    
  }
}
