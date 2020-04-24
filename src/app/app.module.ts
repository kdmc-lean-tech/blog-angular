import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogModule } from './blog/blog.module';
import { SharedModule } from '../app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BlogModule,
    SharedModule,
    MatSidenavModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
