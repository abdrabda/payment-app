import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../constants/api.constants';

describe("Transaction Service test", () => {
  let transactionService: TransactionService;
  let httpClientMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    transactionService = TestBed.inject(TransactionService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  it('test',()=>{
    // transactionService.getTransactions();
    // httpClientMock.expectOne(`${"http://localhost:8080"}${API_ENDPOINTS.TRANSACTION}`);
  })
});
