import { Component, OnInit } from '@angular/core';
import { TransferService } from '../services/transfer-service';
import { AccountService } from '../services/account-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-available-funds',
  imports: [AsyncPipe],
  templateUrl: './available-funds.html',
  styleUrl: './available-funds.css',
})
export class AvailableFunds implements OnInit {


  constructor(private accountService: AccountService, protected transferService: TransferService) {
    this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.transferService.updateCheckingBalance();
  }
}
