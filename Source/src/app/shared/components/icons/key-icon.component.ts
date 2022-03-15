import { Component, Input } from '@angular/core';

@Component({
  selector: 'key-icon',
  template: `
    <svg
      [class]="classNames"
      fill="currentColor"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M725.333333 597.333333h-185.216a256 256 0 1 1 0-170.666666H981.333333v170.666666h-85.333333v170.666667h-170.666667v-170.666667zM298.666667 597.333333a85.333333 85.333333 0 1 0 0-170.666666 85.333333 85.333333 0 0 0 0 170.666666z"
      />
    </svg>
  `
})
export class KeyIconComponent {
  @Input() classNames: string = 'w-6 h-6';
}
