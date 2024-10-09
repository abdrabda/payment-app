package de.fiserv.ipg.exceptions;

/**
 * Custom Exception to be thrown when element not found
 */
public class ElementNotFoundException extends RuntimeException {
  public ElementNotFoundException(String message) {
    super(message);
  }
}