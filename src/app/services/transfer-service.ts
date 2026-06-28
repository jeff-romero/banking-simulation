import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Account } from '../shared/models/account';
import { Transaction } from '../shared/models/transaction';
import { TRANSACTION_HISTORY_URL, TRANSFER_FUNDS_URL } from '../shared/constants/urls';
import { AccountService } from './account-service';
import { ITransfer } from '../shared/interfaces/ITransfer';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TransferService implements OnInit {
  // account!: Account;
  transactions: Transaction[] = [];
  transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);

  constructor(private http: HttpClient, private accountService: AccountService, private toastrService: ToastrService) {
    if (!this.accountService.isAuthenticated()) {
      return;
    }

    // this.accountService.accountObservable.subscribe({
    //   next: (account: Account) => {
    //     this.account = account;
    //   },
    //   error: (errorResponse: any) => {
    //     console.log(`Could not retrieve current account! ${errorResponse}`);
    //   }
    // });
  
    this.updateTransactions();
  }

  ngOnInit(): void {
    this.updateTransactions();
  }

  updateTransactions() {
    this.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        // update internal transactions array with account transactions from the database
        this.transactions = transactions;
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

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + this.accountNumber);
  }

  getTransactionsByType(accountNum: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TRANSACTION_HISTORY_URL + accountNum + '/filter');
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
            this.transactionsSubject.next(this.transactions);
            this.toastrService.success(`Sent $${transaction.amount} to ${transaction.dstAccountNum}`, 'Transfer Successful');
          }
        },
        error: (errorResponse: any) => {
          console.log(errorResponse);
          this.toastrService.error(errorResponse.error, 'Transfer failed');
        }
      })
    );
  }
}
