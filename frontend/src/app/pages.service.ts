import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl ="http://127.0.0.1:8000/api/"

  getPages(){
    return this.http.get(this.APIUrl + 'getPages/')
  }

  setPages(val){
    return this.http.post(this.APIUrl + 'setPages/', val)
  }
}