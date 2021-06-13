import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service'
import { MatDialog } from "@angular/material/dialog";
import { NewArticleComponent } from '../new-article/new-article.component';
import { TextEditComponent } from '../text-edit/text-edit.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  
  constructor(private articles : HeroService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  articleLists: any;
  update:boolean = true;

  ngOnInit(): void {
    this.getArticles()
    let a = setInterval(() => {
      if(this.update){
        this.getArticles()
      }
    }, 3000)
  }

  getArticles(){
    this.articles.getArticleList().subscribe(res => {
      this.articleLists = res;
    })
  }

  nextGeneration(){
    if (window.confirm("Ești sigur că dorești să schimbi ediția?")){
      this.articles.nextGeneration().subscribe(res=> {
        this.getArticles()
        this._snackBar.open("Ai schimbat ediția", "", {duration: 3000});
      })
    }
  }

  openNewArticleDialog(col: number) {
    this.dialog.open(NewArticleComponent, {
      autoFocus: true,
      data: { col },
      maxHeight: "100vh"
     
    });
  }

  openTextDialog(article: object){
    this.dialog.open(TextEditComponent, {
      autoFocus: true,
      data: { article },
      maxHeight: "100vh"
    });
  }

  deleteArticle(id: number){
    this.articles.deleteArticle(id).subscribe(res => {
      this.getArticles()
    })
  }
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    let order : string[] = []
    event.container.data.forEach(el => order.push(el['id']))
    let val = {
      order,
      col : parseInt(event.container.id.slice(-1)) + 1
    }
  this.articles.changeCol(val).subscribe(res => {
    this.update = true;
    this.getArticles()
  })
  }
}
