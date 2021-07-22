import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewArticleComponent } from '../dialogs/new-article/new-article.component';
import { EditArticleComponent } from '../dialogs/edit-article/edit-article.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';
import { Subscription } from 'rxjs'
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  constructor(private articlesService: ArticlesService, private dialog: MatDialog, private snackbar: MatSnackBar) { }
  
  articleLists: any = [[], [], []];
  update:boolean = true;
  private articlesSub: Subscription | undefined;

  ngOnInit(): void {
    this.getArticles()
    setInterval(()=>{
      if (this.update) this.getArticles()
    }, 3000)
    this.articlesSub = this.articlesService.getArticlesUpdateListener()
      .subscribe((articles: any) => {
        this.articleLists = articles
      })
  }

  ngOnDestroy() {
    this.articlesSub?.unsubscribe()
  }

  getArticles(){
    this.articlesService.getArticleList()
  }

  onNewArticle(col: number) {
    this.dialog.open(NewArticleComponent, {
      autoFocus: true,
      data: { col },
      maxHeight: "100vh"
    });
  }
  
  onEditArticle(article: any, col: number) {
    article.col = col
    this.dialog.open(EditArticleComponent, {
      autoFocus: true,
      data: { article },
      maxHeight: "100vh"
    });
  }

  async drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
      let order : string[] = []
      event.container.data.forEach((el : any) => order.push(el['id']))
      let val = {
        order,
        col : parseInt(event.container.id.slice(-1)) + 1
      }
    await this.articlesService.changeCol(val)
    this.update = true
    this.getArticles()
  }

  async nextGeneration(){
    if (window.confirm("Ești sigur că dorești să schimbi ediția?")){
      await this.articlesService.nextGeneration()
      this.getArticles()
      this.snackbar.open("Ai schimbat ediția", "", {duration: 3000});
    }
  }
}
