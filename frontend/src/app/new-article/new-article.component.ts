import { Component, Inject } from '@angular/core';
import { HeroService } from '../hero.service'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {col: string}, private articles : HeroService, private _snackBar: MatSnackBar) { }
  article = {
    title : "",
    text : "",
    pag : 1,
    col : this.data.col
  }

  ngOnInit(): void {
  }

  addArticle(): void{
    this.articles.addArticle(this.article).subscribe(res => {
      this.dialog.closeAll();
      this._snackBar.open("Ai adăugat un articol nou", "", {duration: 5000});
    });
    
  }
}
