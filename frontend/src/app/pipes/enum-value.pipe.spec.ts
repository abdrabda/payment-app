import { TransactionType, Status, Currency } from '../../models/enums';
import { EnumValuePipe } from './enum-value.pipe';

describe('test enum value conversion', () => {
  it.each([
    [Status, 'APPROVED', 'Approved'],
    [Status, 'DECLINED', 'Declined'],
    [Status, 'FAILED', 'Failed'],
    [TransactionType, 'SALE', 'Sale'],
    [TransactionType, 'REFUND', 'Refund'],
    [Currency, 'EUR', 'EUR'],
    [Currency, 'GBP', 'GBP'],
    [Currency, 'INR', 'INR']
  ])('returns user friendly format for Enum Types', (enumType, enumKey, expected) => {
    const enumFormatter = new EnumValuePipe();
    expect(enumFormatter.transform(enumKey, enumType)).toEqual(expected);
  });
});
