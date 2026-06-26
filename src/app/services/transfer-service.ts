import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.accountObservable.subscribe({
      next: (account: Account) => {
        this.account = account;
      },
      error: (errorResponse: any) => {
        console.log(`Could not retrieve current account! ${errorResponse}`);
      }
    });
  }

  ngOnInit(): void {
    // let {}
  }

  get accountNumber() {
    return this.account.accountNumber;
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + this.account.accountNumber);
  }

  getTransactionsByType(accountNum: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + accountNum + '/filter');
  }

  transferFunds(transfer: ITransfer): Observable<Transaction> {
    let body = {srcAccountNum: this.accountNumber, dstAccountNum: transfer.accountNum, amount: transfer.amount};
    console.log(body);
    return this.http.post<Transaction>(TRANSFER_FUNDS_URL, body).pipe(
      tap({
        next: (transaction: any) => {
          console.log(transaction);
        },
        error: (errorResponse: any) => {
          console.log(errorResponse);
        }
      })
    );
  }
}
