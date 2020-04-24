import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from '../../services/publication.service';
import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, pluck } from 'rxjs/operators';
import { loadingConfiguration, editorConfig } from '../../shared/constants/contansts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subscriptions$ = new SubSink();
  public file: File;
  public formDataFile: File;
  public loading = false;
  public loadingConfiguration = loadingConfiguration; 
  public editorConfig = editorConfig;
  private publicationId: number;
  public urlImg: string;
  constructor(
    private _formBuilder: FormBuilder, 
    private _publicationService: PublicationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) { }

  initialReactiveForm() {
    this.form = this._formBuilder.group({
      title: [null, Validators.required],
      subtitle: [null, Validators.required],
      content: [null, Validators.required]
    });
    this.getPublicationId();
  }

  getPublicationId() {
    this.subscriptions$.add(
      this._activatedRoute.params.pipe(pluck('id'))
        .pipe(switchMap(id => {
          if (id) {
            this.publicationId = id;
            return this._publicationService.getPulicationById(this.publicationId);
          } else {
            return [];
          }
        })).subscribe((publication) => {
            this.form.patchValue({
              title: publication.title,
              subtitle: publication.subtitle,
              content: publication.content,
            });
            this.urlImg = publication.img;
        })
    );
  }

  onSubmit() {
    this.publicationId ? this.updatePublication() : this.createPublication();
  }

  createPublication() {
    if (this.file) {
      this.loading = true;
      this.subscriptions$.add(
        this._publicationService.createPublication(this.form.value)
        .pipe(
          switchMap(result => {
            if (result && this.file) {
              let formData = this.buildFormData(this.formDataFile);
              return this._publicationService.uploadImage(result.id, formData);
            } else {
              return [];
            }
          })
        ).subscribe((res) => {
          if (res) {
            Swal.fire('Success', `The publication was successfully saved.`, 'success');
            this.loading = false;
            this._router.navigate(['']);
          }
        })
      );
    } else {
      Swal.fire('Warning', `The file is mandatory.`, 'warning');
      this.loading = false;
    }
  }

  updatePublication() {
    if (this.urlImg || this.file) {
      this.loading = true;
      this.subscriptions$.add(
        this._publicationService.updatePublication(this.publicationId, this.form.value)
        .pipe(switchMap(result => {
          if (result && this.file) {
            const formData = this.buildFormData(this.formDataFile);
            return this._publicationService.uploadImage(this.publicationId, formData);
          } else {
            Swal.fire('Success', `The publication was successfully saved.`, 'success');
            this.loading = false;
            this._router.navigate(['']);
            return [];
          }
        })
      ).subscribe((res) => {
        if (res) {
          Swal.fire('Success', `The publication was successfully saved.`, 'success');
          this.loading = false;
          this._router.navigate(['']);
        }
      })
      );
    }
  }

  onFileChange($event) {
    this.fileReader($event);
    this.fileList($event);
  }

  fileList($event) {
    const fileList: FileList = $event.target.files;
    this.formDataFile = fileList[0];
  }

  fileReader($event) {
    if (this.urlImg) {
      this.urlImg = undefined;
    }
    const reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (event: any) => {
      this.file = event.target.result;
    };
  }

  buildFormData(file: File): FormData {
    let formData = new FormData();
      formData.append(
        "file",
        file,
        file.name
    );
    return formData;
  }

  ngOnInit() {
    this.initialReactiveForm();
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
    this.loading = false;
  }
}
