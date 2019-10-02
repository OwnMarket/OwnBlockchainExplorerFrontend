import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-validator-time-filter',
  templateUrl: './validator-time-filter.component.html',
  styleUrls: ['./validator-time-filter.component.scss']
})
export class ValidatorTimeFilterComponent {
  values = [
    { text: 'Config block', value: 0 },
    { text: '1 day', value: 1 },
    { text: '2 days', value: 2 },
    { text: '3 days', value: 3 },
    { text: '5 days', value: 5 },
    { text: '7 days', value: 7 },
    { text: '10 days', value: 10 },
    { text: '14 days', value: 14 },
    { text: '30 days', value: 30 },
    { text: '60 days', value: 60 },
    { text: '90 days', value: 90 }
  ];

  selected = '7 days';
  open = false;

  @Output() valueChanged: EventEmitter<number> = new EventEmitter<number>();

  valueIsChanged(option: any) {
    this.togglePopup();
    this.selected = option.text;
    this.valueChanged.emit(option.value);
  }

  togglePopup() {
    this.open = !this.open;
  }
}
