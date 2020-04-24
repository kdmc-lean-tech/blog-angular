import { Component, OnInit, OnDestroy } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { SubSink } from 'subsink';
import { loadingConfiguration } from '../../shared/constants/contansts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public publications: Publication[];
  private subscriptions$ = new SubSink();
  public loadingConfiguration = loadingConfiguration; 
  public loading = false;
  constructor(private _publicationService: PublicationService, 
    private _router: Router) { }

  getAllPublications() {
    this.loading = true;
    this.subscriptions$.add(
      this._publicationService.getAllPublications()
        .subscribe((publications) =>{
          this.publications = publications;
          this.loading = false;
        })
    )
  }

  goToPublicationView(id: number) {
    this._router.navigate(['view', id]);
  }

  editPublication(id: number) {
    this._router.navigate(['add', id]);
  }

  ngOnInit() {
    this.getAllPublications();
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
    this.loading = false;
  }

}
