import { Injectable, OnInit, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Account } from '../shared/models/account';
import { Transaction } from '../shared/models/transaction';
import { CHECKING_BALANCE_URL, TRANSACTION_HISTORY_URL, TRANSFER_FUNDS_URL } from '../shared/constants/urls';
import { AccountService } from './account-service';
import { ITransfer } from '../shared/interfaces/ITransfer';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TransferService implements OnInit {
  checkingBalance: number = 0;
  checkingBalanceSubject = new BehaviorSubject<number>(this.checkingBalance);
  transactions: Transaction[] = [];
  transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);
  type?: string;

  UNSORTED: string = 'fa fa-sort';
  ASCENDING: string = 'fa fa-sort-asc';
  DESCENDING: string = 'fa fa-sort-desc';

  srcAccountNumSortedBy: string = this.UNSORTED;
  dstAccountNumSortedBy: string = this.UNSORTED;
  amountSortedBy: string = this.UNSORTED;
  typeSortedBy: string = this.UNSORTED;
  dateSortedBy: string = this.DESCENDING;

  constructor(private http: HttpClient, private accountService: AccountService, private toastrService: ToastrService) {
    if (!this.accountService.isAuthenticated()) {
      return;
    }
  }

  ngOnInit(): void {}

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
      console.log('cant sort');
      return;
    }

    if (this.dateSortedBy == this.DESCENDING) {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'date', 'ascending');
      this.dateSortedBy = this.ASCENDING;
    }
    else {
      this.quicksort(this.transactions, 0, this.transactions.length - 1, 'date', 'descending');
      this.dateSortedBy = this.DESCENDING;
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

  sortByDefault(): void {
    this.quicksort(this.transactions, 0, this.transactions.length - 1, 'date', 'descending');

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
    if (this.dateSortedBy != this.DESCENDING) {
      this.dateSortedBy = this.DESCENDING;
    }
  }

  updateCheckingBalance() {
    this.getCheckingBalance().subscribe({
      next: (checkingBalance: number) => {
        // console.log(`Retrieved checking balance: ${checkingBalance}`);
        this.checkingBalance = checkingBalance;
        this.checkingBalanceSubject.next(checkingBalance);
      },
      error: (errorResponse: any) => {
        console.log(`Service could not retrieve checking balance! ${errorResponse}`);
      }
    });
  }

  updateTransactions(type?: string) {
    this.getTransactions(type).subscribe({
      next: (transactions: Transaction[]) => {
        // update internal transactions array with account transactions from the database
        this.transactions = transactions;
        this.sortByDefault();
        this.transactionsSubject.next(this.transactions);
      },
      error: (errorResponse: any) => {
        console.log(`Could not retrieve transactions!: ${errorResponse}`);
      }
    });
  }

  get accountNumber() {
    return this.accountService.getAccountFromLocalStorage().accountNumber;
  }

  get transactionsSub() {
    return this.transactionsSubject;
  }

  getCheckingBalance(): Observable<number> {
    let accountNum = this.accountNumber;
    return this.http.get<number>(CHECKING_BALANCE_URL + '/' + accountNum);
  }

  getTransactions(type?: string): Observable<Transaction[]> {
    // get transactions by type
    if (type && type.length > 0) {
      return this.getTransactionsByType(type);
    }

    // get all transactions
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + this.accountNumber);
  }

  getTransactionsByType(type: string): Observable<Transaction[]> {
    let body = {type: type};
    return this.http.post<Transaction[]>(TRANSACTION_HISTORY_URL + this.accountNumber + '/filter', body);
  }

  transferFunds(transfer: ITransfer): Observable<Transaction> {
    let body = {srcAccountNum: this.accountNumber, dstAccountNum: transfer.dstAccountNum, type: transfer.type, amount: transfer.amount, date: transfer.date};

    return this.http.post<Transaction>(TRANSFER_FUNDS_URL, body).pipe(
      tap({
        next: (transaction: Transaction) => {
          // when the transaction is successfully processed, update internal transactions array
          if (this.transactions) {
            this.transactions.push(transaction);
            this.sortByDefault();
            // store updated transactions in transactionsSubject
            this.transactionsSubject.next(this.transactions);
            this.toastrService.success(`Sent $${transaction.amount} to ${transaction.dstAccountNum}`, 'Transfer Successful');
            this.updateCheckingBalance();
          }
        },
        error: (errorResponse: any) => {
          console.log(errorResponse);
          this.toastrService.error(errorResponse.error, 'Transfer failed');
        }
      })
    );
  }

  withdrawFunds() {

  }

  depositFunds() {
    
  }
}
