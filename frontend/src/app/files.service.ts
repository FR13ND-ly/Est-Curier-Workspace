import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl ="http://127.0.0.1:8000/api/"

  getFiles(val){
    return this.http.post(this.APIUrl + 'getFiles/', val)
  }

  downloadFile(val){
    return this.http.post(this.APIUrl + 'downloadFile/', val)
  }

  prepareDownload(val) {
    return this.http.post(this.APIUrl + 'prepareDownload/', val)
  }
}
