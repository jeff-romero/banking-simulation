import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../services/account-service';
import { Account } from '../shared/models/account';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterOutlet],
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

  constructor(private accountService: AccountService) {
    // let checkingSavingsDropdown = document.getElementById('checking-savings-dropdown') as HTMLSpanElement;
    // checkingSavingsDropdown.addEventListener("mouseover", (e) => {

    // });
    this.accountService.accountObservable.subscribe((newAccount) => {
      this.account = newAccount;

      if (this.isAuthenticated) {
        this.loggedIn = true;
      }
    });
  }

  ngOnInit() {

  }

  logOut() {
    this.accountService.logOut();
  }

  get isAuthenticated() {
    return this.account.token;
  }
}
