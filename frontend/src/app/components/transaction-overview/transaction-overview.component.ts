import { Component } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';
import { RouterLink } from '@angular/router';
import { Status, TransactionType } from '../../../models/enums';
import { ErrorFormatterPipe } from '../../pipes/error-formatter.pipe';
import { DateFormatterPipe } from '../../pipes/date-formatter.pipe';
import { EnumValuePipe } from '../../pipes/enum-value.pipe';

@Component({
  selector: 'app-transaction-overview',
  standalone: true,
  imports: [DateFormatterPipe,RouterLink,EnumValuePipe, ErrorFormatterPipe],
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
  isLoading = false;
  error : any = undefined;
  constructor(private transactionService: TransactionService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.transactionService.getTransactions().
    subscribe({
      next:(response)=>{
        this.isLoading = false;
        this.transactions = response;
      },
      error:(error)=>{
        this.isLoading = false;
        this.error = error;
      }
    });;
  }
}
