import { Component, OnInit } from '@angular/core';

import { TransferService } from '../services/transfer-service';
import { Transaction } from '../shared/models/transaction';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from '../services/account-service';

@Component({
  selector: 'app-transaction-history',
  imports: [KeyValuePipe, AsyncPipe],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnInit {
  transactions: Transaction[] = [];
  transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);

  UNSORTED: string = 'fa fa-sort';
  ASCENDING: string = 'fa fa-sort-asc';
  DESCENDING: string = 'fa fa-sort-desc';

  srcAccountNumSortedBy: string = this.UNSORTED;
  dstAccountNumSortedBy: string = this.UNSORTED;
  amountSortedBy: string = this.UNSORTED;
  typeSortedBy: string = this.UNSORTED;
  dateSortedBy: string = this.UNSORTED;

  constructor(private transferService: TransferService, private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.accountService.isAuthenticated()) {
      return;
    }

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

  swap(arr: Transaction[], i: number, j: number): void {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  partitionSrcAccountNumAscending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (arr[j].srcAccountNum < pivot.srcAccountNum) {
        i++;
        this.swap(arr, i, j);
      }
    }

    this.swap(arr, i + 1, right);
    return i + 1;
  }

  partitionSrcAccountNumDescending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (arr[j].srcAccountNum > pivot.srcAccountNum) {
        i++;
        this.swap(arr, i, j);
      }
    }

    this.swap(arr, i + 1, right);
    return i + 1;
  }

  partitionAmountAscending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (arr[j].amount < pivot.amount) {
        i++;
        this.swap(arr, i, j);
      }
    }

    this.swap(arr, i + 1, right);
    return i + 1;
  }

  partitionAmountDescending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (arr[j].amount > pivot.amount) {
        i++;
        this.swap(arr, i, j);
      }
    }

    this.swap(arr, i + 1, right);
    return i + 1;
  }

  quicksort(arr: Transaction[], left: number, right: number, property: string, sortBy: string) {
    if (left < right) {
      let pivotIndex = 0;

      if (sortBy == 'ascending') {
        switch (property) {
          case 'srcAccountNum':
            pivotIndex = this.partitionSrcAccountNumAscending(arr, left, right);
            break;
          case 'dstAccountNum':
            break;
          case 'amount':
            pivotIndex = this.partitionAmountAscending(arr, left, right);
            break;
          case 'type':
            break;
          case 'date':
            break;
          default:
            break;
        }
      }
      else {
        switch (property) {
          case 'srcAccountNum':
            pivotIndex = this.partitionSrcAccountNumDescending(arr, left, right);
            break;
          case 'dstAccountNum':
            break;
          case 'amount':
            pivotIndex = this.partitionAmountDescending(arr, left, right);
            break;
          case 'type':
            break;
          case 'date':
            break;
          default:
            break;
        }
      }

      this.quicksort(arr, left, pivotIndex - 1, property, sortBy);
      this.quicksort(arr, pivotIndex + 1, right, property, sortBy);
    }
  }

  sortSrcAccountNum(): void {
    if (!this.transactions || this.transactions.length == 0) {
      return;
    }


  }

  sortDstAccountNum(): void {
    if (!this.transactions || this.transactions.length == 0) {
      return;
    }


  }

  sortAmount(): void {
    if (!this.transactions || this.transactions.length == 0) {
      return;
    }

    if (this.amountSortedBy == this.ASCENDING) {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'amount', 'descending');
      this.amountSortedBy = this.DESCENDING;
    }
    else {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'amount', 'ascending');
      this.amountSortedBy = this.ASCENDING;
    }

    if (this.srcAccountNumSortedBy != this.UNSORTED) {
      this.srcAccountNumSortedBy = this.UNSORTED;
    }
    if (this.dstAccountNumSortedBy != this.UNSORTED) {
      this.dstAccountNumSortedBy = this.UNSORTED;
    }
    if (this.typeSortedBy != this.UNSORTED) {
      this.typeSortedBy = this.UNSORTED;
    }
    if (this.dateSortedBy != this.UNSORTED) {
      this.dateSortedBy = this.UNSORTED;
    }
  }

  sortType(): void {
    if (!this.transactions || this.transactions.length == 0) {
      return;
    }


  }

  sortDate(): void {
    if (!this.transactions || this.transactions.length == 0) {
      return;
    }


  }
}
