import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  readonly APIUrl = "https://ecworkspace.pythonanywhere.com/api/"
  constructor(private http: HttpClient) { }

  private message: any = true
  private messageUpdated = new Subject<any>() 

  getMessageUpdateListener() {
    return this.messageUpdated.asObservable()
  }

  async getMessages(){
    let res : any = await this.http.get(this.APIUrl + 'getMessages/').toPromise() 
    this.message = res.messages
    this.messageUpdated.next(this.message)
  }

  async sendMessage(val: any){
    await this.http.post(this.APIUrl + 'sendMessage/', val).toPromise()
    this.getMessages()
  }

  async removeMessage(val: any){
    await this.http.post(this.APIUrl + 'removeMessage/', val).toPromise()
    this.getMessages()
  }
}
