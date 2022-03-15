import { Component, Input } from '@angular/core';

@Component({
  selector: 'check-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [class]="classNames"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `
})
export class CheckIconComponent {
  @Input() classNames: string = 'w-6 h-6';
}
