import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, HostListener } from '@angular/core';
import { FilesService } from '../files.service';

export interface filesInterface{
  id : number,
  file : string,
  name : string,
  date : string,
  newEdition : boolean,
  downloaded : boolean
}

@Component({
  selector: 'app-files-manager',
  templateUrl: './files-manager.component.html',
  styleUrls: ['./files-manager.component.scss']
})
export class FilesManagerComponent implements OnInit {

  constructor(private filesService : FilesService, private _snackBar: MatSnackBar) { }
  
  files : any
  lk: number = 1
  loading: boolean = false
  selected : object[] = [];
  last: boolean = false

  ngOnInit(): void {
    this.getFiles();  
    let a = setInterval(() => {
      this.getFiles()
    }, 30000)
  }

  getFiles(){
    this.filesService.getFiles({lk : this.lk}).subscribe(res=>{
      this.last = res['last']
      this.files = res['files']
    })
  }

  downloadFile(event){
    let file = event.target.files[0]
    let formData = new FormData()
    formData.append('file', file, file.name)
    this.filesService.downloadFile(formData).subscribe(res=>{
      this.getFiles()
      this._snackBar.open("Ai adăugat un file nou", "", {duration: 5000});
    })
  }

  selectImage(container, id, e, index){
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
  
  download(){
    if (this.selected.length > 0){
      this.filesService.prepareDownload({files: this.selected}).subscribe(res => {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', "http://127.0.0.1:8000/api/media/file-uri.zip");
        link.setAttribute('download', `products.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
    }
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight - 50;
    if (pos >= max && !this.loading && !this.last){
      this.loading = true
      this.lk++;
      this.filesService.getFiles({lk: this.lk}).subscribe(res => {
        this.last = res['last']
        this.files = res['files']
        this.loading = false
      })
    } 
  }
}
