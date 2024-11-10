import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order',
  standalone: true
})
export class OrderPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value + " project";
  }

}
