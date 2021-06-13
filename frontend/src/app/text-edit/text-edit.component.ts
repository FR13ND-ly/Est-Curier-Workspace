import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroService } from '../hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.scss']
})
export class TextEditComponent implements OnInit {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {article: any}, private articles: HeroService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveChanges(){
    this.articles.changeArticle(this.data.article).subscribe()
  }

  deleteArticle(){
    if (window.confirm("Ești sigur că dorești să ștergi articolul?")){
      this.articles.deleteArticle(this.data.article.id).subscribe(res => {
        this.dialog.closeAll();
        this._snackBar.open("Ai șters un articol", "", {duration: 3000});
      })
    }
  }
}
