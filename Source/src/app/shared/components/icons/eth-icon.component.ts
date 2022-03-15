import { Component, Input } from '@angular/core';

@Component({
  selector: 'eth-icon',
  template: `
    <svg
      [class]="classNames"
      viewBox="0 0 169.33333 169.33333"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs829" />
      <g id="layer1" transform="translate(-24.550119,-8.4844924)">
        <g id="All" transform="matrix(0.23065018,0,0,0.23065018,-33.959591,-17.493925)">
          <g id="Developer-Center" transform="translate(-1008,-2285)">
            <g id="Group-28" transform="translate(382,2270.8)">
              <g id="Group-29" transform="translate(0,0.200001)">
                <g id="Group-10" transform="translate(0,14)">
                  <g id="Group-13">
                    <g id="Group-46" transform="translate(626.4)">
                      <g id="Group-45">
                        <circle id="Oval" class="st0" cx="620.79999" cy="481.5" r="365.79999" />
                        <polygon id="Path" class="st1" points="632.2,207.1 632.2,409.9 803.6,486.5 " />
                        <polygon id="Path_1_" class="st2" points="632.2,207.1 460.8,486.5 632.2,409.9 " />
                        <polygon id="Path_2_" class="st1" points="632.2,617.9 632.2,755.7 803.7,518.4 " />
                        <polygon id="Path_3_" class="st2" points="632.2,755.7 632.2,617.9 460.8,518.4 " />
                        <polygon id="Path_4_" class="st3" points="632.2,586 803.6,486.5 632.2,409.9 " />
                      </g>
                      <polygon id="Path_5_" class="st1" points="460.8,486.5 632.2,586 632.2,409.9 " />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <style type="text/css" id="style1251">
        .st0 {
          fill: #627eea;
        }
        .st1 {
          fill: #ffffff;
          fill-opacity: 0.602;
        }
        .st2 {
          fill: #ffffff;
        }
        .st3 {
          fill: #ffffff;
          fill-opacity: 0.2;
        }
      </style>
    </svg>
  `
})
export class EthIconComponent {
  @Input() classNames: string = 'w-6 h-6';
}
