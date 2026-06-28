import { Component } from '@angular/core';
import { AccountService } from '../services/account-service';
import { TransferService } from '../services/transfer-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private accountService: AccountService, private transferService: TransferService) {
    this.accountService.accountObservable.subscribe({
      next: () => {
        this.transferService.updateTransactions();
      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
      }
    });
  }
}
