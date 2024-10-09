export enum TransactionType {
  SALE="Sale", REFUND="Refund"
}
export enum Status {
  APPROVED="Approved", DECLINED="Declined", FAILED="Failed"
}
export enum Currency {
  EUR="EUR", GBP="GBP", INR="INR"
}

/**
 * Returns a Keyvalue pair of an Enum type, in order to use it e.g. in Dropdowns
 * @param enumObj
 * @returns
 */
export function getEnumKeyValue<T extends Record<string, string>>(enumObj: T): { [key: string]: string } {
  return Object.keys(enumObj).reduce((acc, key) => {
    const value = enumObj[key as keyof T];
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });
}

