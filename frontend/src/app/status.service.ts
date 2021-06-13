import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  readonly APIUrl ="http://127.0.0.1:8000/api/"
  constructor(private http: HttpClient) { }

  getStatus(){
    return this.http.get(this.APIUrl + 'getStatus/')
  }

  changeStatus(val){
    return this.http.post(this.APIUrl + 'changeStatus/', val)
  }
}
