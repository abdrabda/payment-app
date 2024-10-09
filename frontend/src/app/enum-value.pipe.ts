import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValue',
  standalone: true
})
/**
 * Returns the Value of an Enum Key: e.g.: APPROVED -> Approved
 */
export class EnumValuePipe implements PipeTransform {
  transform(enumKey: string, enumObj: any): string | undefined {
    return enumObj[enumKey as keyof typeof enumObj];
  }
}
