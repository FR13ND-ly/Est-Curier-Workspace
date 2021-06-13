import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ArticlesComponent } from './articles/articles.component';
import { MatCardModule } from '@angular/material/card';
import { HeroService } from './hero.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NewArticleComponent } from './new-article/new-article.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { TextEditComponent } from './text-edit/text-edit.component';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { StatusService } from './status.service';
import { PagesService } from './pages.service';
import { PagesComponent } from './pages/pages.component';
import { FilesManagerComponent } from './files-manager/files-manager.component';
import { FormatPreviewPipe } from './formatPreview.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    NewArticleComponent,
    TextEditComponent,
    PagesComponent,
    FilesManagerComponent,
    FormatPreviewPipe
  ],
  imports: [
    MatSnackBarModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatSliderModule,
    FormsModule,
    MatMenuModule,
    DragDropModule,
    MatTabsModule
  ],
  providers: [HeroService, StatusService, PagesService, FormatPreviewPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
