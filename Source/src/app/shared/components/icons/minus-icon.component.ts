import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'minus-icon',
  template: `
    <svg [class]="classNames" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinusIconComponent {
  @Input() classNames: string = 'w-6 h-6';
}
