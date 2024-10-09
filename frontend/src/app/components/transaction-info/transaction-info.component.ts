import { Component, Input } from '@angular/core';
import { Transaction } from '../../../models/Transaction';
import { DateFormatterPipe } from '../../date-formatter.pipe';
import { EnumValuePipe } from '../../enum-value.pipe';
import { Status, TransactionType } from '../../../models/enums';

@Component({
  selector: 'app-transaction-info',
  standalone: true,
  imports: [DateFormatterPipe, EnumValuePipe],
  templateUrl: './transaction-info.component.html',
  styleUrl: './transaction-info.component.scss'
})
/**
 * Component to display transaction information
 */
export class TransactionInfoComponent {
  @Input() transaction: Transaction | undefined;
  statusEnum = Status;
  transactionTypeEnum = TransactionType;
}
