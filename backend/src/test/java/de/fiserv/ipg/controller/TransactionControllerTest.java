package de.fiserv.ipg.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.List;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import de.fiserv.ipg.entity.Transaction;
import de.fiserv.ipg.entity.Transaction.Currency;
import de.fiserv.ipg.entity.Transaction.Status;
import de.fiserv.ipg.entity.Transaction.TransactionType;
import de.fiserv.ipg.exceptions.ElementNotFoundException;
import de.fiserv.ipg.service.TransactionService;
import de.fiserv.ipg.utils.WebEnvironmentTests;

public class TransactionControllerTest extends WebEnvironmentTests {
  @Autowired
  private TestRestTemplate restTemplate;
  private String url;
  private HttpEntity<Object> request;

  @MockBean
  private TransactionService transactionService;

  @BeforeEach
  void setUp() {
    url = String.format("/api/transactions");
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    request = new HttpEntity<>(null, headers);
  }

  @Test
  void listTransactions_ThenReturnOk() {
    List<Transaction> transactions = new ArrayList<Transaction>();
    transactions.add(new Transaction(new BigDecimal(10), LocalDateTime.now(), TransactionType.REFUND, Status.DECLINED,
            Currency.GBP));
    when(transactionService.getAllTransactions()).thenReturn(transactions);
    var response = restTemplate.exchange(url, HttpMethod.GET, request,
            Transaction[].class);
    assertEquals(response.getStatusCode(), HttpStatus.OK);
    assertEquals(response.getBody().length, 1);
  }

  @Test
  void getTransactionById_WhenIDFound_ThenReturnOk() {
    var transaction = new Transaction(new BigDecimal(10), LocalDateTime.now(), TransactionType.REFUND, Status.DECLINED,
            Currency.GBP);
    when(transactionService.getTransactionById(1)).thenReturn(transaction);
    var response = restTemplate.exchange(String.format("%s/%s", url, 1), HttpMethod.GET, request,
            Transaction.class);
    assertEquals(response.getBody().getAmount(), new BigDecimal(10));
    assertEquals(response.getBody().getTransactionType(), TransactionType.REFUND);
    assertEquals(response.getBody().getStatus(), Status.DECLINED);
    assertEquals(response.getBody().getCurrency(), Currency.GBP);
    assertEquals(response.getStatusCode(), HttpStatus.OK);
  }

  @Test
  void getTransactionById_WhenIDNotFound_ThenReturnNotFound() {
    List<Transaction> transactions = new ArrayList<Transaction>();
    transactions.add(new Transaction(new BigDecimal(10), LocalDateTime.now(), TransactionType.REFUND, Status.DECLINED,
            Currency.GBP));
    when(transactionService.getTransactionById(1)).thenThrow(ElementNotFoundException.class);
    var response = restTemplate.exchange(String.format("%s/%s", url, 1), HttpMethod.GET, request,
            Transaction.class);
    assertEquals(response.getStatusCode(), HttpStatus.NOT_FOUND);
  }

}
