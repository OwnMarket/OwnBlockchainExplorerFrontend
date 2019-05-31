import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollEnd]'
})
export class ScrollEndDirective {
  @Output() endReached: EventEmitter<boolean> = new EventEmitter();
  @HostListener('scroll', ['$event.target'])
  onScroll(target: any) {
    const limit = target.scrollHeight - target.clientHeight;
    if (limit > 0 && target.scrollTop === limit) {
      this.endReached.emit(true);
    }
  }
}
