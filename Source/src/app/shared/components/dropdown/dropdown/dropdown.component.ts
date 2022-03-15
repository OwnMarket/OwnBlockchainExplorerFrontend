import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() isRight: boolean = true;
  @Input() isLeft: boolean = false;

  isOpen: boolean = false;
  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
