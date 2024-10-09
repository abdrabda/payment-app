import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/Transaction';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
/**
 * A Service that is used to communicate with the backend
 */
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  getTransactions():Observable<Transaction[]>{
    return this.httpClient.get<Transaction[]>(`${"http://localhost:8080"}${API_ENDPOINTS.TRANSACTION}`);
  }

  getTransactionById(id:number):Observable<Transaction>{
    return this.httpClient.get<Transaction>(`${"http://localhost:8080"}${API_ENDPOINTS.TRANSACTION}/${id}`);
  }

  saveTransaction(transaction:Transaction):Observable<Transaction>{
    return this.httpClient.post<Transaction>(`${"http://localhost:8080"}${API_ENDPOINTS.TRANSACTION}`,transaction);
  }
}
