import { Component, OnInit } from '@angular/core';

import { TransferService } from '../services/transfer-service';
import { Transaction } from '../shared/models/transaction';
import { KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  imports: [KeyValuePipe],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transferService: TransferService) {
  }

  ngOnInit(): void {
    this.transferService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.transactions = transactions;
      },
      error: (errorResponse: any) => {
        console.log(`Could not retrieve transaction!: ${errorResponse}`);
      }
    });
  }

  sort(event: Event) {
    console.log(event);
  }
}
