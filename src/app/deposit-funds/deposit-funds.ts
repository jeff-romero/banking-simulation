import { Component } from '@angular/core';
import { Deposit } from '../deposit/deposit';
import { AvailableFunds } from '../available-funds/available-funds';

@Component({
  selector: 'app-deposit-funds',
  imports: [Deposit, AvailableFunds],
  templateUrl: './deposit-funds.html',
  styleUrl: './deposit-funds.css',
})
export class DepositFunds {}
