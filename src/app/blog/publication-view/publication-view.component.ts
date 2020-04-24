import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../../services/publication.service';
import { SubSink } from 'subsink';
import { pluck, switchMap } from 'rxjs/operators';
import { Publication } from '../../models/publication';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.scss']
})
export class PublicationViewComponent implements OnInit, OnDestroy {
  private subscriptions$ = new SubSink();
  private publicationId: number;
  public publication: Publication;
  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _publicationService: PublicationService
  ) { }

  getPublicationById() {
    this.subscriptions$.add(
      this._activatedRoute.params.pipe(pluck('id'))
        .pipe(switchMap(id => {
          if (id) {
            this.publicationId = id;
            return this._publicationService.getPulicationById(this.publicationId);
          }
        })).subscribe((publication) => {
            this.publication = publication;
        })
    );
  }

  ngOnInit() {
    this.getPublicationById();
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}
