import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewsPipes',
  standalone: true,
})
export class ViewsPipe implements PipeTransform {
  transform(value: any, pipeName: string): unknown {
    if (!value) return value;

    switch (pipeName) {
      case 'date':
        return new Intl.DateTimeFormat('es-ES').format(new Date(value));
      case 'currency':
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
        }).format(value);
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
      default:
        return value;
    }
  }
}
