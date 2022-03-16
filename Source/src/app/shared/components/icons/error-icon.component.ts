import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-icon',
  template: `
    <svg [class]="classNames" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
  `
})
export class ErrorIconComponent {
  @Input() classNames: string = 'w-6 h-6';
}