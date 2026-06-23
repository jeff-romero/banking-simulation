import { Injectable } from '@angular/core';
import { Account } from '../shared/models/account';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ACCOUNT_LOGIN_URL, ACCOUNTS_URL, TRANSACTION_HISTORY_URL, TRANSFER_FUNDS_URL } from '../shared/constants/urls';
import { IAccountLogin } from '../shared/interfaces/IAccountLogin';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../shared/models/transaction';

const ACCOUNT_KEY = 'Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountSubject = new BehaviorSubject<Account>(this.getAccountFromLocalStorage());
  public accountObservable: Observable<Account>;

  constructor(private http:HttpClient, private toastrService: ToastrService) {
    this.accountObservable = this.accountSubject.asObservable();
  }

  logIn(accountLogin: IAccountLogin): Observable<Account> {
    return this.http.post<Account>(ACCOUNT_LOGIN_URL, accountLogin).pipe(
      tap({
        next: (account: any) => {
          this.setAccountToLocalStorage(account);
          this.accountSubject.next(account);
          this.toastrService.success(
            `Welcome to Balanced Banking, ${account.firstName}`,
            'Login successful'
          );
        },
        error: (errorResponse: any) => {
          this.toastrService.error(errorResponse.error, 'Login failed');
        }
      })
    );
  }

  logOut() {
    this.accountSubject.next(new Account());
    localStorage.removeItem(ACCOUNT_KEY);
    // TODO: redirect to home page
    window.location.reload();
  }

  // get isAuthenticated() {
    
  // }

  get currentAccount(): Observable<Account> {
    return this.accountSubject;
  }

  getAll(): Observable<Account[]> {
    // TODO: if database connection fails, return sampleAccounts
    // TODO: implement database connection
    return this.http.get<Account[]>(ACCOUNTS_URL);
  }

  private setAccountToLocalStorage(account: Account) {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  }

  private getAccountFromLocalStorage(): Account {
    const accountJson = localStorage.getItem(ACCOUNT_KEY);

    if (accountJson) {
      return JSON.parse(accountJson) as Account;
    }

    return new Account();
  }
}
