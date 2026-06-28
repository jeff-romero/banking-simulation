import { Component, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../services/account-service';
import { Account } from '../shared/models/account';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation implements OnInit {
  bankName = "Balanced Banking";
  checkingSavings = "Checking and Savings";
  services = "Services";
  LOG_IN = "Log In";
  MY_ACCOUNT = "My Account";
  logInStatus = this.LOG_IN;
  // property binding - class
  LOCK_ICON = "fa fa-lock";
  ACCOUNT_MANAGEMENT_ICON = "fa fa-cog";
  loginStatus = "fa fa-lock";
  logInStatusIcon = this.LOCK_ICON;
  @Output() loggedIn:boolean = false;
  account!: Account;
  accountName: string = '';

  constructor(private accountService: AccountService) {
    this.accountService.accountObservable.subscribe({
      next: (account: Account) => {
        this.account = account;
        this.accountName = this.account.firstName;
      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
      }
    });
  }

  ngOnInit() {}

  logOut() {
    this.accountService.logOut();
  }

  get isAuthenticated() {
    return this.account.token;
  }
}
