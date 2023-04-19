import { Pipe, PipeTransform } from '@angular/core';

// Converts weight in hectograms to string detailing that weight in kilograms and pounds
@Pipe({ name: 'convertWeight' })
export class convertWeightPipe implements PipeTransform {
  transform(weight: number) {
    const kilograms = weight / 10;
    return kilograms + 'kgs (' + (Math.round(kilograms * 2.2) + ' lbs)');
  }
}
