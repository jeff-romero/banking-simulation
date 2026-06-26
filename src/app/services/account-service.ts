import { Injectable } from '@angular/core';
import { Account } from '../shared/models/account';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ACCOUNT_LOGIN_URL, ACCOUNTS_URL, SEARCH_ACCOUNT_NUM_URL, TRANSACTION_HISTORY_URL, TRANSFER_FUNDS_URL } from '../shared/constants/urls';
import { IAccountLogin } from '../shared/interfaces/IAccountLogin';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../shared/models/transaction';
import { sampleAccounts } from '../../data';
import { Router } from '@angular/router';

const ACCOUNT_KEY = 'Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountSubject = new BehaviorSubject<Account>(this.getAccountFromLocalStorage());
  public accountObservable: Observable<Account>;

  constructor(private http:HttpClient, private toastrService: ToastrService, private router: Router) {
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

  isAuthenticated(): boolean {
    let token = '';
    this.accountSubject.subscribe({
      next: (account: Account) => {
        return account.token;
      },
      error: (errorResponse: any) => {
        console.log(`error ${errorResponse}`);
      }
    });

    if (!token) {
      this.router.navigateByUrl('login');
    }
    return false;
  }

  getAll(): Observable<Account[]> {
    // TODO: if database connection fails, return sampleAccounts
    // TODO: implement database connection
    return this.http.get<Account[]>(ACCOUNTS_URL);
  }

  getAccountByNum(accountNum: number): Observable<Account> {
    return this.http.get<Account>(SEARCH_ACCOUNT_NUM_URL + accountNum);
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
