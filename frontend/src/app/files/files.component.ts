import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FilesService } from './files.service';
import { Subscription } from 'rxjs'
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {
  constructor(private filesService : FilesService, private _snackBar: MatSnackBar, private loadingService: LoadingService) { }
  
  files : any
  lk: number = 1
  loading: boolean = false
  selected : object[] = [];
  last: boolean = false

  private filesSub: Subscription | undefined;

  ngOnInit(): void {
    this.getFiles();
    this.filesSub = this.filesService.getFilesUpdateListener()
      .subscribe((files: any) => {
        this.files = files
      })
  }

  ngOnDestroy() {
    this.filesSub?.unsubscribe()
  }

  async getFiles(){
    this.last = await this.filesService.getFiles({lk : this.lk})
  }

  async downloadFile(event : any){
    this.loadingService.changeLoading(true)
    let file = event.target.files[0]
    let formData = new FormData()
    formData.append('file', file, file.name)
    await this.filesService.downloadFile(formData)
    this.getFiles()
    this.loadingService.changeLoading(false)
    this._snackBar.open("Ai adăugat un file nou", "", {duration: 5000});
  }

  @HostListener('document:keydown.control.shift.a', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    if (this.selected.length != this.files.length) {
      this.selected = []
      this.files.forEach((file:any) => {
        this.selected.push(file.id)
      });
    }
    else this.selected = []
  }

  selectImage(container : any, id : any, e : any, index : any){
    if (e.ctrlKey){
      if (this.selected.includes(id)){
        this.selected.splice(this.selected.indexOf(id), 1)
      }
      else {
        this.selected.push(id)
      }
    }
    else if (e.shiftKey){
      let firstIndex = 0
      let firstEl = this.selected.sort()[0]
      for(var i = 0; i < this.files.length; i += 1) {
        if(this.files[i]['id'] === firstEl) {
          firstIndex = i
        }
      }
      this.selected = []
      if (firstIndex < index){
        for(var i = firstIndex; i < index + 1; i += 1) {
          if (i > -1 && i < this.files.length){
            this.selected.push(this.files[i]['id'])
          }
        }
      }
      else {
        for(var j = index; j < firstIndex + 1; j += 1) {
          if (j > -1 && j < this.files.length){
            this.selected.push(this.files[j]['id'])
          }
        }
      }
    }
    else {
      this.selected = [id]
    }
  }
  
  async download(){
    if (this.selected.length > 0){
      await this.filesService.prepareDownload({files: this.selected})
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', "https://ecworkspace.pythonanywhere.com/api/media/file-uri.zip");
      link.setAttribute('download', `products.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  @HostListener('window:scroll', ['$event']) async onScrollEvent($event : any){
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight - 50;
    if (pos >= max && !this.loading && !this.last){
      this.loading = true
      this.lk++;
      this.getFiles()
      this.loading = false
    } 
  }
}
