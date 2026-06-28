import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Account } from '../shared/models/account';
import { Transaction } from '../shared/models/transaction';
import { TRANSACTION_HISTORY_URL, TRANSFER_FUNDS_URL } from '../shared/constants/urls';
import { AccountService } from './account-service';
import { ITransfer } from '../shared/interfaces/ITransfer';

@Injectable({
  providedIn: 'root',
})
export class TransferService implements OnInit {
  account!: Account;
  transactions: Transaction[] = [];
  transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.accountObservable.subscribe({
      next: (account: Account) => {
        this.account = account;
      },
      error: (errorResponse: any) => {
        console.log(`Could not retrieve current account! ${errorResponse}`);
      }
    });

    this.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.transactions = transactions;
        this.transactionsSubject.next(this.transactions);
      },
      error: (errorResponse: any) => {
        console.log(`Could not retrieve transaction!: ${errorResponse}`);
      }
    });
  }

  ngOnInit(): void {
  }

  get accountNumber() {
    return this.account.accountNumber;
  }

  get transactionsSub() {
    return this.transactionsSubject;
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + this.account.accountNumber);
  }

  getTransactionsByType(accountNum: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + accountNum + '/filter');
  }

  transferFunds(transfer: ITransfer): Observable<Transaction> {
    let body = {srcAccountNum: this.accountNumber, dstAccountNum: transfer.dstAccountNum, type: transfer.type, amount: transfer.amount, date: transfer.date};
    console.log(body);
    return this.http.post<Transaction>(TRANSFER_FUNDS_URL, body).pipe(
      tap({
        next: (transaction: any) => {
          if (this.transactions) {
            this.transactions.push(transaction);
            // store updated transactions in transactionsSubject
            this.transactionsSubject.next(this.transactions);
          }
        },
        error: (errorResponse: any) => {
          console.log(errorResponse);
        }
      })
    );
  }
}
