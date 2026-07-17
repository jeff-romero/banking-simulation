import { Injectable, OnInit } from '@angular/core';
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

  quicksort(arr: Transaction[], left: number, right: number) {
    if (left < right) {
      let pivotIndex = 0;

      pivotIndex = this.partitionDateDescending(arr, left, right);

      this.quicksort(arr, left, pivotIndex - 1);
      this.quicksort(arr, pivotIndex + 1, right);
    }
  }

  sortDate(): void {
    if (!this.transactions || this.transactions.length == 0) {
      return;
    }

    this.quicksort(this.transactions, 0, this.transactions.length - 1);
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
        this.sortDate();
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
            // store updated transactions in transactionsSubject
            this.sortDate();
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
