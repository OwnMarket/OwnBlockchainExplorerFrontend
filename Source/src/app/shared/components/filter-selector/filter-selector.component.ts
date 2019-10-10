import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent {
  options: string[] = ['Action', 'DepositGiven', 'DepositTaken', 'StakeReturned', 'StakingReward', 'ValidatorReward'];

  selectedFilters: string[] = [];

  @Output() onFilterChange: EventEmitter<string> = new EventEmitter<string>();

  open = false;

  get filter(): string {
    return this.selectedFilters.join(',');
  }

  onChangeFilter(event: any, option: string) {
    if (this.selectedFilters.includes(option)) {
      this.selectedFilters.splice(this.selectedFilters.indexOf(option), 1);
    } else {
      this.selectedFilters.push(option);
    }
    this.onFilterChange.emit(this.filter);
  }

  togglePopup(event?: any) {
    if (event === false) {
      this.open = false;
    } else if (event === 'filter') {
      this.open = !this.open;
    }
  }
}
