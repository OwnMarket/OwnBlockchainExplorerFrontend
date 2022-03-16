import { Component, Input } from '@angular/core';

@Component({
  selector: 'copy-icon',
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
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  `
})
export class CopyIconComponent {
  @Input() classNames: string = 'w-6 h-6';
}