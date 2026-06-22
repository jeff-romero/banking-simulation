import { Component, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

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
  @Input() isLoggedIn:boolean = false;

  constructor() {
    // let checkingSavingsDropdown = document.getElementById('checking-savings-dropdown') as HTMLSpanElement;
    // checkingSavingsDropdown.addEventListener("mouseover", (e) => {

    // });
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.logInStatus = this.MY_ACCOUNT;
      this.logInStatusIcon = this.ACCOUNT_MANAGEMENT_ICON;
    }
  }

  hover(event: PointerEvent): void {
    event.preventDefault();
    console.log("hovered");
  }
}
