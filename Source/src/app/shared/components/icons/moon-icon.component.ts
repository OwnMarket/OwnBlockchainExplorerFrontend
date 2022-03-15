import { Component, Input } from '@angular/core';

@Component({
  selector: 'moon-icon',
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `
})
export class MoonIconComponent {
  @Input() classNames: string = 'w-6 h-6';
}
