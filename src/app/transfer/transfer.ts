import { Component, Input, OnInit, Output } from '@angular/core';
import { InputContainer } from '../partials/input-container/input-container';

@Component({
  selector: 'app-transfer',
  imports: [InputContainer],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css',
})
export class Transfer implements OnInit {
  @Output() transferLabel!: string;
  @Output() transferPlaceholder!: string;
  @Output() amountLabel!: string;
  @Output() amountPlaceholder!: string;

  constructor() {
    
  }

  ngOnInit() {
    this.transferLabel = 'Transfer To';
    this.transferPlaceholder = 'Account Number';

    this.amountLabel = 'Amount';
    this.amountPlaceholder = 'Amount';
  }
}
