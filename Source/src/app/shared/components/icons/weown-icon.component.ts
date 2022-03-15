import { Component, Input } from '@angular/core';

@Component({
  selector: 'weown-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" [class]="classNames">
      <g transform="translate(-11789 -9194)">
        <rect width="200" height="200" transform="translate(11789 9194)" fill="none"></rect>
        <g transform="translate(11730.067 9144.252)">
          <path
            d="M107.56,168.965a1.317,1.317,0,0,0,1.94-.62l20.632-37.519a15.362,15.362,0,0,1,19.942-8.6,14.672,14.672,0,0,1,2.228,1.1l1.818,1.107L182.1,141.207a1.318,1.318,0,0,0,1.833-.484L215.558,85.37A85.743,85.743,0,0,0,73.19,148.232Z"
            transform="translate(0 0)"
            fill="#f26622"
          ></path>
          <path
            d="M220.69,546.411l-2.2,2.382a18.057,18.057,0,0,1-23.968,2.262l-32.206-22.588a1.318,1.318,0,0,0-1.913.387l-20.823,28.8-1.531,2.155a11.08,11.08,0,0,1-15.2,3.819,11.846,11.846,0,0,1-1.613-1.178L90.8,537.946a85.764,85.764,0,0,0,168.282-23.359q0-2.346-.127-4.657Z"
            transform="translate(-14.408 -364.842)"
            fill="#f26622"
          ></path>
        </g>
      </g>
    </svg>
  `
})
export class WeOwnIconComponent {
  @Input() classNames: string = 'w-6 h-6';
}
