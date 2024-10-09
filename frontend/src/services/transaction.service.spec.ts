import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service'; // Update the path as necessary
import { Transaction } from '../models/Transaction';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Currency, Status, TransactionType } from '../models/enums';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TransactionService]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpMock.verify();
  });

  it('should fetch all transactions', () => {
    const dummyTransactions: Transaction[] = [
      { id: 1, amount: 100, timestamp:[10],currency:Currency.EUR,status:Status.APPROVED, transactionType: TransactionType.SALE },
      { id: 1, amount: 100, timestamp:[10],currency:Currency.EUR,status:Status.APPROVED, transactionType: TransactionType.SALE },
    ];

    service.getTransactions().subscribe(transactions => {
      expect(transactions.length).toBe(2);
      expect(transactions).toEqual(dummyTransactions);
    });

    const req = httpMock.expectOne(`${"http://localhost:8080"}${API_ENDPOINTS.TRANSACTION}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTransactions);
  });

  it('should fetch a transaction by ID', () => {
    const dummyTransaction: Transaction = { id: 1, amount: 100, timestamp:[10],currency:Currency.EUR,status:Status.APPROVED, transactionType: TransactionType.SALE };

    service.getTransactionById(1).subscribe(transaction => {
      expect(transaction).toEqual(dummyTransaction);
    });

    const req = httpMock.expectOne(`${"http://localhost:8080"}${API_ENDPOINTS.TRANSACTION}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTransaction);
  });

  it('should save a transaction', () => {
    const newTransaction: Transaction = { id: 1, amount: 100, timestamp:[10],currency:Currency.EUR,status:Status.APPROVED, transactionType: TransactionType.SALE };;

    service.saveTransaction(newTransaction).subscribe(transaction => {
      expect(transaction).toEqual(newTransaction);
    });

    const req = httpMock.expectOne(`${"http://localhost:8080"}${API_ENDPOINTS.TRANSACTION}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTransaction);
    req.flush(newTransaction);
  });
});
