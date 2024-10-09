import { Component } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';
import { DateFormatterPipe } from '../../date-formatter.pipe';
import { RouterLink } from '@angular/router';
import { Status, TransactionType } from '../../../models/enums';
import { EnumValuePipe } from '../../enum-value.pipe';

@Component({
  selector: 'app-transaction-overview',
  standalone: true,
  imports: [DateFormatterPipe,RouterLink,EnumValuePipe],
  templateUrl: './transaction-overview.component.html',
  styleUrl: './transaction-overview.component.scss',
})
/**
 * Lists all transactions
 */
export class TransactionOverviewComponent {
  transactions: Transaction[] = [];
  statusEnum = Status;
  transactionTypeEnum = TransactionType;

  constructor(private transactionService: TransactionService) {}
  ngOnInit(): void {
    this.transactionService.getTransactions().
    subscribe({
      next:(response)=>{
        this.transactions = response;
      }
    });;
  }
}
