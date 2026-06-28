import { Component } from '@angular/core';
import { AccountService } from '../services/account-service';
import { Account } from '../shared/models/account';
import { Observable } from 'rxjs';
import { TransferService } from '../services/transfer-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  accounts: Account[] = [];

  constructor(private accountService: AccountService, private transferService: TransferService) {
    let accountsObservable:Observable<Account[]> = accountService.getAll();

    accountsObservable.subscribe((serverAccounts) => {
      this.accounts = serverAccounts;
    });
    this.transferService.updateTransactions();
  }
}
