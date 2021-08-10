import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule.forChild(), RouterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}
