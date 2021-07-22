import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcupationService {

  constructor(private http: HttpClient) { }

   readonly APIUrl = "https://ecworkspace.pythonanywhere.com/api/"
  //readonly APIUrl = "http://localhost:8000/api/"
  status: boolean = true
  private statusUpdated = new Subject<any>() 

  getStatusUpdateListener() {
    return this.statusUpdated.asObservable()
  }

  async getStatus(){
    let res: any = await this.http.get(this.APIUrl + 'getStatus/').toPromise()
    if (res.occuped != this.status) {
      this.status = res.occuped
      this.statusUpdated.next(this.status)
    }
  }

  changeStatus(val : any){
    console.log(val)
    return this.http.post(this.APIUrl + 'changeStatus/', val).toPromise()
  }
}
