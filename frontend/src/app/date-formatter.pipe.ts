import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true
})
/**
 * Formats a date (from Java LocalDate) into readable form
 */
export class DateFormatterPipe implements PipeTransform {
  transform(value: number[]): string {
    if (!value || value.length < 7) {
      return 'Invalid date';
    }

    const [year, month, day, hour, minute, second, nanosecond] = value;
    const date = new Date(year, month - 1, day, hour, minute, second, Math.floor(nanosecond / 1000000));

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    return date.toLocaleString('de-DE', options);
  }

}
