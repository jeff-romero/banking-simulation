import { Component } from '@angular/core';
import { AccountService } from '../services/account-service';
import { TransferService } from '../services/transfer-service';
import { WidgetService } from '../services/widget-service';
import { Widget } from '../widget/widget';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, Widget],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private accountService: AccountService, private transferService: TransferService, protected widgetService: WidgetService) {
    this.widgetService.getPatchNotes();

    this.accountService.accountObservable.subscribe({
      next: () => {
        // this.transferService.updateTransactions();
      },
      error: (errorResponse: any) => {
        console.log(errorResponse);
      }
    });
  }
}
