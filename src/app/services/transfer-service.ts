import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Account } from '../shared/models/account';
import { Transaction } from '../shared/models/transaction';
import { TRANSACTION_HISTORY_URL } from '../shared/constants/urls';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class TransferService implements OnInit {
  account!: Account;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.accountObservable.subscribe({
      next: (account: Account) => {
        this.account = account;
        if (this.account.transactions) {
          for (let i = 0; i < this.account.transactions?.length; i++) {
            console.log(this.account.transactions[i]);
          }
        }
      },
      error: (errorResponse: any) => {
        console.log(`Could not retrieve current account! ${errorResponse}`);
      }
    });
  }

  ngOnInit(): void {
    // let {}
  }

  getTransactions(accountNum: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + accountNum);
  }

  getTransactionsByType(accountNum: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + accountNum + '/filter');
  }

  transferFunds(srcAccount: number, dstAccount: number, amount: number) {

  }
}
