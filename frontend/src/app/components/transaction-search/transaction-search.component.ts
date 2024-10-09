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

@Component({
  selector: 'app-transaction-search',
  standalone: true,
  imports: [ReactiveFormsModule, TransactionInfoComponent],
  templateUrl: './transaction-search.component.html',
  styleUrl: './transaction-search.component.scss',
})
/**
 * Component to search for transaction by ID
 */
export class TransactionSearchComponent {
  transaction: Transaction | undefined;
  errorMessage: string | undefined;

  form = new FormGroup({
    id: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
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
            let msg = (err.error && typeof err.error === "string") ? err.error : JSON.stringify(err);
            this.errorMessage = msg;
          },
        });
    } else {
      this.errorMessage = 'ID should be a valid number';
    }
  }
}
