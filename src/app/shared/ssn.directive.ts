import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSsn]'
})
export class SsnDirective {
  @HostListener('ngModelChange', ['$event']) onModelChange(value: string) {
    this.onInputChange(value, false);
  }

  @HostListener('keydown.backspace', ['$event']) keydownBackspace(
    event: KeyboardEvent
  ) {
    this.onInputChange((event.target as HTMLInputElement).value, true);
  }

  constructor(private control: NgControl) {}

  onInputChange(value: string, isBackspace: boolean) {
    if (!value) {
      return;
    }

    let newValue = value.replace(/\D/g, '');

    if (isBackspace && value.endsWith('-')) {
      newValue = newValue.substring(0, newValue.length - 1);
    }

    if (newValue.length < 4) {
      this.control.valueAccessor.writeValue(newValue);
    } else if (newValue.length < 6) {
      this.control.valueAccessor.writeValue(
        newValue.replace(/^(\d{0,3})(\d{0,2})/, '$1-$2')
      );
    } else {
      this.control.valueAccessor.writeValue(
        newValue.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})/, '$1-$2-$3')
      );
    }
  }
}
