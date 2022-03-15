import { Component, Input } from '@angular/core';

@Component({
  selector: 'de-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [class]="classNames" viewBox="0 0 5 3">
      <path d="M0 0h5v3H0z" />
      <path fill="#D00" d="M0 1h5v2H0z" />
      <path fill="#FFCE00" d="M0 2h5v1H0z" />
    </svg>
  `
})
export class DeIconComponent {
  @Input() classNames: string = 'w-8 h-6';
}
