import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorFormatter',
  standalone: true
})
/**
 * Formats errors returned by backend and transform it into string
 */
export class ErrorFormatterPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return "";
    }
    if (value.error && typeof value.error === "string") {
      return value.error;
    }
    if (typeof value === "object" && value.message && typeof value.message === "string") {
      return value.message;
    }
    return JSON.stringify(value);
  }

}
