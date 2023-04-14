import { Pipe, PipeTransform } from '@angular/core';

// Replaces hyphens in string with spaces
@Pipe({
  name: 'removeHyphens'
})
export class removeHyphensPipe implements PipeTransform {

  transform(location: string): string {
    return location.replaceAll("-", " ");
  }

}
