package de.fiserv.ipg.controller;

import de.fiserv.ipg.entity.Transaction;
import de.fiserv.ipg.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

  private final TransactionService transactionService;

  @Autowired
  public TransactionController(TransactionService transactionService) {
    this.transactionService = transactionService;
  }

  @GetMapping
  public ResponseEntity<List<Transaction>> getAllTransactions() {
    return ResponseEntity.ok(transactionService.getAllTransactions());
  }

  @GetMapping(path = "/{transactionId}")
  public ResponseEntity<Transaction> getTransactionById(@PathVariable long transactionId) {
    return ResponseEntity.ok(transactionService.getTransactionById(transactionId));
  }

  @PostMapping
  public ResponseEntity<Transaction> getTransactionById(@RequestBody Transaction transaction) {
    return ResponseEntity.ok(transactionService.saveTransaction(transaction));
  }
}
