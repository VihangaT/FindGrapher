import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToWord'
})
export class NullToWordPipe implements PipeTransform {

  transform(value: string, character: string): string {
    return value.replace(character, 'Not-Specified');
  }

}
