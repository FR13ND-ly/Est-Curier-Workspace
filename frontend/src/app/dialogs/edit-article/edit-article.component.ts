import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticlesService } from 'src/app/articles/articles.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent{

  constructor( @Inject(MAT_DIALOG_DATA) public data: {article: any}, private articlesService: ArticlesService, private dialog: MatDialog, private snackbar: MatSnackBar) { }
  
  article = this.data.article

  async onSaveChanges(){
    await this.articlesService.changeArticle(this.data.article)
    this.articlesService.getArticleList()
  }

  async onDeleteArticle(){
    if (window.confirm("Ești sigur că dorești să ștergi acest articol?")){
      await this.articlesService.deleteArticle(this.data.article.id)
      this.dialog.closeAll();
      let message = this.snackbar.open(`Ai șters articolul "${this.article.title}"`, "întoarce", {duration: 6000});
      await message.onAction().toPromise()
      this.articlesService.addArticle(this.article)
    }
  }
}
