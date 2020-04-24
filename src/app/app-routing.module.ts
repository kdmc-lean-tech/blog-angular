import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './blog/list/list.component';
import { AddPublicationComponent } from './blog/add-publication/add-publication.component';
import { PublicationViewComponent } from './blog/publication-view/publication-view.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'add', component: AddPublicationComponent },
  { path: 'add/:id', component: AddPublicationComponent },
  { path: 'view/:id', component: PublicationViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
