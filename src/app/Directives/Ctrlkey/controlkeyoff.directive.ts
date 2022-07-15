import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appControlkeyoff]'
})
export class ControlkeyoffDirective {
  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    console.log(event);
    if (event.ctrlKey || event.key == '86') {
      event.returnValue = false;
      event.preventDefault();
    }
  }
  constructor() { }

}
