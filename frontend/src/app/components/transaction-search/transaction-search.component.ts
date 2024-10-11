import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';
import { TransactionInfoComponent } from '../transaction-info/transaction-info.component';
import { ErrorFormatterPipe } from '../../pipes/error-formatter.pipe';

@Component({
  selector: 'app-transaction-search',
  standalone: true,
  imports: [ReactiveFormsModule, TransactionInfoComponent, ErrorFormatterPipe],
  templateUrl: './transaction-search.component.html',
  styleUrl: './transaction-search.component.scss',
})
/**
 * Component to search for transaction by ID
 */
export class TransactionSearchComponent {
  transaction: Transaction | undefined;
  error: any = undefined;

  form = new FormGroup({
    id: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
  });
  constructor(private transactionService: TransactionService) {}

  onSubmit() {
    this.transaction = undefined;
    if (this.form.valid) {
      this.transactionService
        .getTransactionById(this.form.value.id!)
        .subscribe({
          next: (response) => {
            this.transaction = response;
          },
          error: (err) => {
            this.error = err;
          },
        });
    } else {
      this.error = 'ID should be a valid number';
    }
  }
}
