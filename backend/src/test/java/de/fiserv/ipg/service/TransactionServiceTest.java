package de.fiserv.ipg.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import de.fiserv.ipg.entity.Transaction;
import de.fiserv.ipg.entity.Transaction.Currency;
import de.fiserv.ipg.entity.Transaction.Status;
import de.fiserv.ipg.entity.Transaction.TransactionType;
import de.fiserv.ipg.exceptions.ElementNotFoundException;
import de.fiserv.ipg.repository.TransactionRepository;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {
  @Mock
  private TransactionRepository transactionRepo;

  private TransactionService transactionService;

  @BeforeEach
  void setup() {
    this.transactionService = new TransactionService(transactionRepo);
  }

  @Test
  void getAllTransactions_ThenReturnList() {
    var transactionList = new ArrayList<Transaction>();
    transactionList
            .add(new Transaction(new BigDecimal(100), LocalDateTime.now(), TransactionType.REFUND, Status.DECLINED,
                    Currency.GBP));
    transactionList.add(new Transaction(new BigDecimal(200), LocalDateTime.now(), TransactionType.SALE, Status.APPROVED,
            Currency.EUR));
    when(transactionRepo.findAll()).thenReturn(transactionList);
    var result = transactionService.getAllTransactions();
    assertEquals(result.size(), 2);
  }

  @Test
  void getTransactionsByID_WhenIDFound_ThenReturnTransactionObject() {
    var transaction = new Transaction(new BigDecimal(200), LocalDateTime.now(), TransactionType.SALE, Status.APPROVED,
            Currency.EUR);
    when(transactionRepo.findById(anyLong())).thenReturn(Optional.of(transaction));
    var result = transactionService.getTransactionById(1);
    assertEquals(result.getAmount(), new BigDecimal(200));
    assertEquals(result.getTransactionType(), TransactionType.SALE);
    assertEquals(result.getStatus(), Status.APPROVED);
    assertEquals(result.getCurrency(), Currency.EUR);
  }

  @Test
  void getTransactionsByID_WhenIDNotFound_ThenThrowElementNotFoundException() {
    when(transactionRepo.findById(anyLong())).thenReturn(Optional.empty());
    assertThrows(ElementNotFoundException.class, () -> transactionService.getTransactionById(200));
  }
}
