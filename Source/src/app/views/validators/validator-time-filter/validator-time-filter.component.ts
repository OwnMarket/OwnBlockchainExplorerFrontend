import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownComponent } from '@app/shared/components/dropdown/dropdown/dropdown.component';

@Component({
  selector: 'app-validator-time-filter',
  templateUrl: './validator-time-filter.component.html',
  styleUrls: ['./validator-time-filter.component.scss'],
})
export class ValidatorTimeFilterComponent {
  values = [0, 1, 2, 3, 5, 7, 10, 14, 30, 60, 90];
  selected = 7;
  open = false;

  @Output() valueChanged: EventEmitter<number> = new EventEmitter<number>();

  valueIsChanged(value: number, dropdown: DropdownComponent) {
    this.selected = value;
    this.valueChanged.emit(value);
    dropdown.toggle();
  }

  togglePopup() {
    this.open = !this.open;
  }
}
