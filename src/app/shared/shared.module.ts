import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { PaginationComponent } from './pagination/pagination.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ToolbarComponent, PaginationComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    FlexModule
  ],
  exports: [ToolbarComponent, PaginationComponent]
})
export class SharedModule { }
