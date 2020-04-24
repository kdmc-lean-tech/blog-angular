import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationService } from '../services/publication.service';
import { HttpClientModule } from '@angular/common/http';
import { AddPublicationComponent } from './add-publication/add-publication.component';
import { MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxLoadingModule } from 'ngx-loading';
import { ListComponent } from './list/list.component';
import { PublicationViewComponent } from './publication-view/publication-view.component';

@NgModule({
  declarations: [AddPublicationComponent, ListComponent, PublicationViewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule, 
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    AngularEditorModule,
    NgxLoadingModule.forRoot({}),
    FlexModule,
    FlexLayoutModule
  ],
  providers: [
    PublicationService
  ],
  exports: [AddPublicationComponent, ListComponent]
})
export class BlogModule { }
