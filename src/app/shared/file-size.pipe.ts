import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, decimals = 0): unknown {
    if (!bytes) {
      return '0 Bytes';
    }

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      parseFloat(
        (bytes / Math.pow(k, i)).toFixed(decimals < 0 ? 0 : decimals)
      ) +
      ' ' +
      sizes[i]
    );
  }
}
