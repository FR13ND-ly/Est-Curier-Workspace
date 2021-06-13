import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  readonly APIUrl ="http://127.0.0.1:8000/api/"
  constructor(private http: HttpClient) { }

  getMessages(){
    return this.http.get(this.APIUrl + 'getMessages/')
  }

  sendMessage(val){
    return this.http.post(this.APIUrl + 'sendMessage/', val)
  }
}
