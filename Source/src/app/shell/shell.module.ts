import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, NgbModule, RouterModule, SharedModule],
  declarations: [HeaderComponent, ShellComponent]
})
export class ShellModule {}
