import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = "https://ecworkspace.pythonanywhere.com/api/"

  articles: any = [[]]
  private articlesUpdated = new Subject<[][]>() 

  getArticlesUpdateListener() {
    return this.articlesUpdated.asObservable()
  }

  async getArticleList(){
    this.articles = await this.http.get(this.APIUrl + 'articles/').toPromise()
    this.articlesUpdated.next([...this.articles])
  }

  addArticle(val: object){
    return this.http.post(this.APIUrl + 'addArticle/', val).toPromise()
  }
  
  deleteArticle(val: number){
    return this.http.delete(this.APIUrl + "deleteArticle/" + val + "/").toPromise()
  }

  changeCol(val: object){
    return this.http.post(this.APIUrl + "changeCol/", val).toPromise()
  }
  
  changeArticle(val: object){
    return this.http.post(this.APIUrl + "changeArticle/", val).toPromise()
  }
  
  nextGeneration(){
    return this.http.get(this.APIUrl + 'nextGeneration/').toPromise()
  }
}
