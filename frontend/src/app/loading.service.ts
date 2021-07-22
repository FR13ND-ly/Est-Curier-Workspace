import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  loading: boolean = false;

  private loadingUpdated = new Subject<boolean>()
  
  getLoadingUpdateListener() {
    return this.loadingUpdated.asObservable()
  }

  changeLoading(status : boolean) {
    this.loading = status
    this.loadingUpdated.next(this.loading)
  }
}
