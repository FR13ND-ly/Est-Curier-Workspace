import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  readonly APIUrl ="http://127.0.0.1:8000/api/"
  constructor(private http: HttpClient) { }

  getArticleList(){
    return this.http.get(this.APIUrl + 'articles/')
  }

  addArticle(val: object){
    return this.http.post(this.APIUrl + 'addArticle/', val)
  }
  
  deleteArticle(val: number){
    return this.http.delete(this.APIUrl + "deleteArticle/" + val + "/");
  }

  changeCol(val: object){
    return this.http.post(this.APIUrl + "changeCol/", val);
  }
  
  changeArticle(val: object){
    return this.http.post(this.APIUrl + "changeArticle/", val);
  }
  
  nextGeneration(){
    return this.http.get(this.APIUrl + 'nextGeneration/')
  }
}
