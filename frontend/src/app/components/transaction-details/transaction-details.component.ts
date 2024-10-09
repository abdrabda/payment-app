import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';
import { TransactionInfoComponent } from '../transaction-info/transaction-info.component';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [TransactionInfoComponent],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
/**
 * Component to display the details of a transaction. The Transaction ID is retrieved from the URL /transaction-detail/:id
 */
export class TransactionDetailsComponent {
  transaction: Transaction | undefined;
  errorMessage: string | undefined;
  constructor(private transactionService: TransactionService, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.transactionService.getTransactionById(id).
    subscribe({
      next:(response)=>{
        this.transaction = response;
      },
      error:(err) => {
        this.errorMessage = err.error;
      },
    });
  }

}