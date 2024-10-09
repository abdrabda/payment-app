package de.fiserv.ipg.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
/**
 * Global exception handler that catches exception thrown by the application
 * and returns a proper object
 */
public class GlobalExceptionHandler {
  @ExceptionHandler(ElementNotFoundException.class)
  public ResponseEntity<String> handleResourceNotFound(ElementNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  /**
   * Catch general exceptions
   * 
   * @param ex
   * @return
   */
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

}
