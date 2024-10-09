import { Currency, Status, TransactionType } from './enums';

export interface Transaction {
  id: number;
  amount: number;
  timestamp: number[];
  transactionType: TransactionType;
  status: Status;
  currency: Currency;
}
