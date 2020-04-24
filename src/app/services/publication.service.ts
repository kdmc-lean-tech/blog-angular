import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private url = `http://localhost:8000`;
  constructor(private _httpClientSerivce: HttpClient) {
   }

  getAllPublications(): Observable<Publication[]> {
    return this._httpClientSerivce.get<Publication[]>(`${this.url}/publication`);
  }

  createPublication(publication: Publication): Observable<Publication> {
    return this._httpClientSerivce.post<Publication>(`${this.url}/publication`, publication);
  }

  updatePublication(id: number, publication: Publication): Observable<Publication> {
    return this._httpClientSerivce.put<Publication>(`${this.url}/publication/${id}`, publication);
  }

  getPulicationById(id: number): Observable<Publication> {
    return this._httpClientSerivce.get<Publication>(`${this.url}/publication/${id}`);
  }

  deletePublicationById(id: number): Observable<Publication> {
    return this._httpClientSerivce.delete<Publication>(`${this.url}/publication/${id}`);
  }

  uploadImage(id: number, file: FormData): Observable<any> {
    return this._httpClientSerivce.post<any>(`${this.url}/publication/upload/${id}`, file);
  }
}
