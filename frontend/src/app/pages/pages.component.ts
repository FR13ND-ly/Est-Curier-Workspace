import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagesService } from './pages.service';
import { Subscription } from 'rxjs'
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  constructor(private pagesService: PagesService, private _snackBar: MatSnackBar, private loadingService: LoadingService) { }

  pages = []
  pagesSub: Subscription|undefined

  ngOnInit(): void {
    this.getPages()
    this.pagesSub = this.pagesService.getArticlesUpdateListener()
      .subscribe((pages: any) => {
        this.pages = pages
      })
  }

  ngOnDestroy() {
    this.pagesSub?.unsubscribe()
  }
  
  getPages(){
    this.pagesService.getPages()
  }

  async setPages(event : any){
    this.loadingService.changeLoading(true)
    let file = event.target.files[0]
    let formData = new FormData()
    formData.append('file', file, file.name)
    await this.pagesService.setPages(formData)
    this.getPages()
    this.loadingService.changeLoading(false)
    this._snackBar.open("Ai actualizat păginile", "", {duration: 5000});
  }

  showImage(url : string){
    location.href = url;
  }
}
