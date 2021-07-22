import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = "https://ecworkspace.pythonanywhere.com/api/"
  //readonly APIUrl = "http://localhost:8000/api/"

  files : any = []
  private filesUpdated = new Subject<any[]>() 

  getFilesUpdateListener() {
    return this.filesUpdated.asObservable()
  }

  async getFiles(val : any) : Promise<boolean> {
    let res : any = await this.http.post(this.APIUrl + 'getFiles/', val).toPromise()
    this.files = res.files
    this.filesUpdated.next(this.files)
    return res.last
  }

  downloadFile(val : any){
    return this.http.post(this.APIUrl + 'downloadFile/', val).toPromise()
  }

  prepareDownload(val : any) {
    return this.http.post(this.APIUrl + 'prepareDownload/', val).toPromise()
  }
}
