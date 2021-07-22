import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = "https://ecworkspace.pythonanywhere.com/api/"

  pages: string[] = []

  private pagesUpdated = new Subject<string[]>() 

  getArticlesUpdateListener() {
    return this.pagesUpdated.asObservable()
  }

  async getPages(){
    let res: any = await this.http.get(this.APIUrl + 'getPages/').toPromise()
    this.pages = res.pages
    this.pagesUpdated.next([...this.pages])
  }

  async setPages(val : any){
    return this.http.post(this.APIUrl + 'setPages/', val).toPromise()
  }
}