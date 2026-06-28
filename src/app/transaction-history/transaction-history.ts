import { Component, OnInit } from '@angular/core';

import { TransferService } from '../services/transfer-service';
import { Transaction } from '../shared/models/transaction';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AccountService } from '../services/account-service';

@Component({
  selector: 'app-transaction-history',
  imports: [KeyValuePipe, AsyncPipe],
  providers: [DatePipe],
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

  datePattern = /(?<weekday>\w+),\s+(?<month>\w+)\s+(?<day>\d{1,2}),\s+(?<year>\d{4}),\s+(?<hour>\d{1,2}):(?<minute>\d{1,2}):(?<second>\d{1,2})\s+(?<meridiem>AM|PM)\s+(?<timezone>\w+(-|\+)\d+:\d+)/;

  constructor(private transferService: TransferService, private accountService: AccountService, private datePipe: DatePipe) {
    // this.datePipe.transform(Date.parse(str), 'EEEE, MMMM d, y, HH:mm:ss zzzz');
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

  partitionDstAccountNumAscending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (arr[j].dstAccountNum < pivot.dstAccountNum) {
        i++;
        this.swap(arr, i, j);
      }
    }

    this.swap(arr, i + 1, right);
    return i + 1;
  }

  partitionDstAccountNumDescending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (arr[j].dstAccountNum > pivot.dstAccountNum) {
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

  partitionTypeAscending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (arr[j].type < pivot.type) {
        i++;
        this.swap(arr, i, j);
      }
    }

    this.swap(arr, i + 1, right);
    return i + 1;
  }

  partitionTypeDescending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (arr[j].type > pivot.type) {
        i++;
        this.swap(arr, i, j);
      }
    }

    this.swap(arr, i + 1, right);
    return i + 1;
  }

  partitionDateAscending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (Date.parse(arr[j].date) < Date.parse(pivot.date)) {
        i++;
        this.swap(arr, i, j);
      }
    }

    this.swap(arr, i + 1, right);
    return i + 1;
  }

  partitionDateDescending(arr: Transaction[], left: number, right: number) {
    let pivot = arr[right];

    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
      if (Date.parse(arr[j].date) > Date.parse(pivot.date)) {
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
            pivotIndex = this.partitionDstAccountNumAscending(arr, left, right);
            break;
          case 'amount':
            pivotIndex = this.partitionAmountAscending(arr, left, right);
            break;
          case 'type':
            pivotIndex = this.partitionTypeAscending(arr, left, right);
            break;
          case 'date':
            pivotIndex = this.partitionDateAscending(arr, left, right);
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
            pivotIndex = this.partitionDstAccountNumDescending(arr, left, right);
            break;
          case 'amount':
            pivotIndex = this.partitionAmountDescending(arr, left, right);
            break;
          case 'type':
            pivotIndex = this.partitionTypeDescending(arr, left, right);
            break;
          case 'date':
            pivotIndex = this.partitionDateDescending(arr, left, right);
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

    if (this.srcAccountNumSortedBy == this.ASCENDING) {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'srcAccountNum', 'descending');
      this.srcAccountNumSortedBy = this.DESCENDING;
    }
    else {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'srcAccountNum', 'ascending');
      this.srcAccountNumSortedBy = this.ASCENDING;
    }

    if (this.dstAccountNumSortedBy != this.UNSORTED) {
      this.dstAccountNumSortedBy = this.UNSORTED;
    }
    if (this.amountSortedBy != this.UNSORTED) {
      this.amountSortedBy = this.UNSORTED;
    }
    if (this.typeSortedBy != this.UNSORTED) {
      this.typeSortedBy = this.UNSORTED;
    }
    if (this.dateSortedBy != this.UNSORTED) {
      this.dateSortedBy = this.UNSORTED;
    }
  }

  sortDstAccountNum(): void {
    if (!this.transactions || this.transactions.length == 0) {
      return;
    }

    if (this.dstAccountNumSortedBy == this.ASCENDING) {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'dstAccountNum', 'descending');
      this.dstAccountNumSortedBy = this.DESCENDING;
    }
    else {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'dstAccountNum', 'ascending');
      this.dstAccountNumSortedBy = this.ASCENDING;
    }

    if (this.srcAccountNumSortedBy != this.UNSORTED) {
      this.srcAccountNumSortedBy = this.UNSORTED;
    }
    if (this.amountSortedBy != this.UNSORTED) {
      this.amountSortedBy = this.UNSORTED;
    }
    if (this.typeSortedBy != this.UNSORTED) {
      this.typeSortedBy = this.UNSORTED;
    }
    if (this.dateSortedBy != this.UNSORTED) {
      this.dateSortedBy = this.UNSORTED;
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

    if (this.typeSortedBy == this.ASCENDING) {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'type', 'descending');
      this.typeSortedBy = this.DESCENDING;
    }
    else {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'type', 'ascending');
      this.typeSortedBy = this.ASCENDING;
    }

    if (this.srcAccountNumSortedBy != this.UNSORTED) {
      this.srcAccountNumSortedBy = this.UNSORTED;
    }
    if (this.dstAccountNumSortedBy != this.UNSORTED) {
      this.dstAccountNumSortedBy = this.UNSORTED;
    }
    if (this.amountSortedBy != this.UNSORTED) {
      this.amountSortedBy = this.UNSORTED;
    }
    if (this.dateSortedBy != this.UNSORTED) {
      this.dateSortedBy = this.UNSORTED;
    }
  }

  sortDate(): void {
    if (!this.transactions || this.transactions.length == 0) {
      return;
    }

    if (this.dateSortedBy == this.ASCENDING) {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'date', 'descending');
      this.dateSortedBy = this.DESCENDING;
    }
    else {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'date', 'ascending');
      this.dateSortedBy = this.ASCENDING;
    }

    if (this.srcAccountNumSortedBy != this.UNSORTED) {
      this.srcAccountNumSortedBy = this.UNSORTED;
    }
    if (this.dstAccountNumSortedBy != this.UNSORTED) {
      this.dstAccountNumSortedBy = this.UNSORTED;
    }
    if (this.amountSortedBy != this.UNSORTED) {
      this.amountSortedBy = this.UNSORTED;
    }
    if (this.typeSortedBy != this.UNSORTED) {
      this.typeSortedBy = this.UNSORTED;
    }
  }
}
