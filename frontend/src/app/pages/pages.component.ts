import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private pagesService: PagesService, private _snackBar: MatSnackBar) { }

  pages = []

  ngOnInit(): void {
    this.getPages()
    let a = setInterval(() => {
      this.getPages()
    }, 10000)
  }
  
  getPages(){
    this.pagesService.getPages().subscribe(res => {
      this.pages = res['pages']
    })
  }

  setPages(event){
    let file = event.target.files[0]
    let formData = new FormData()
    formData.append('file', file, file.name)
    this.pagesService.setPages(formData).subscribe(res => {
      this.getPages()
      this._snackBar.open("Ai actualizat păginile", "", {duration: 5000});
    })
  }

  showImage(url){
    location.href = url;
  }
}
