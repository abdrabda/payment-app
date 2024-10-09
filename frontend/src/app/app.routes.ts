import { Routes } from '@angular/router';
import { TransactionOverviewComponent } from './components/transaction-overview/transaction-overview.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionSearchComponent } from './components/transaction-search/transaction-search.component';
import { SaveTransactionComponent } from './components/save-transaction/save-transaction.component';

export const routes: Routes = [
  {
    path: '', component: TransactionOverviewComponent,
  },
  {
    path: 'transaction-details/:id', component: TransactionDetailsComponent
  },
  {
    path: 'search', component: TransactionSearchComponent
  },
  {
    path: 'create', component: SaveTransactionComponent
  }
];
