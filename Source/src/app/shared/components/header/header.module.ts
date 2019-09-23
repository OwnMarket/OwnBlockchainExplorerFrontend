import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgbModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}
