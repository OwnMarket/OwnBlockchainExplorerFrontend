import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgbCollapseModule, RouterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}
