import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticlesService } from 'src/app/articles/articles.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {col: string}, private articlesService : ArticlesService, private _snackBar: MatSnackBar) { }
  
  article = {
    title : "",
    text : "",
    pag : 1,
    col : this.data.col
  }

  ngOnInit(): void {
  }

  async addArticle() {
    await this.articlesService.addArticle(this.article)
    this.dialog.closeAll()
    this._snackBar.open("Ai adăugat un articol nou", "", {duration: 5000})
    
  }
}
