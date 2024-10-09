package de.fiserv.ipg.service;

import de.fiserv.ipg.entity.Transaction;
import de.fiserv.ipg.exceptions.ElementNotFoundException;
import de.fiserv.ipg.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

  private final TransactionRepository transactionRepository;

  @Autowired
  public TransactionService(TransactionRepository transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public List<Transaction> getAllTransactions() {
    return transactionRepository.findAll();
  }

  public Transaction getTransactionById(long id) throws ElementNotFoundException {
    var transaction = transactionRepository.findById(id);
    if (transaction.isEmpty()) {
      throw new ElementNotFoundException(String.format("Transaction with an ID %s is not found", id));
    }
    return transaction.get();
  }

  public Transaction saveTransaction(Transaction transaction) {
    transaction.setTimestamp(LocalDateTime.now());
    return transactionRepository.save(transaction);
  }

}
