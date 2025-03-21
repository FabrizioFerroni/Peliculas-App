import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteToHour',
  standalone: true,
})
export class MinuteToHourPipe implements PipeTransform {
  transform(value: number): string {
    const horas = ~~(value / 60); // ~~ = Math.floor
    const minutos = value % 60;

    return `${horas}h ${minutos}min`;
  }
}
