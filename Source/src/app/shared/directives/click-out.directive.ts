import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOut]'
})
export class ClickOutDirective {
  @Output() clickOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  private clickWasInside = false;
  private isFocused = false;

  @HostListener('click')
  clickedInside() {
    this.clickWasInside = true;
    this.isFocused = true;
    this.clickOut.emit(this.clickWasInside);
  }

  @HostListener('document:click')
  clickedOut() {
    if (!this.isFocused && this.clickWasInside) {
      this.clickWasInside = false;
    }
    this.clickOut.emit(this.clickWasInside);
    this.isFocused = false;
  }
}
