import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Account } from '../shared/models/account';
import { Transaction } from '../shared/models/transaction';
import { TRANSACTION_HISTORY_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Account[]> {
    // TODO: if database connection fails, return sampleAccounts
    // TODO: implement database connection
    return this.http.get<Account[]>(TRANSACTION_HISTORY_URL);
  }

  transferFunds(srcAccount: number, dstAccount: number, amount: number) {

  }
}
