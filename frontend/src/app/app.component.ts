import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OcupationService } from './ocupation.service';
import { MessagesService } from './messages.service';
import { Subscription } from 'rxjs'
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isDarkTheme: boolean = false
  @HostBinding('class') componentCssClass: string | undefined;
  
  constructor(public overlayContainer: OverlayContainer, private snackBar: MatSnackBar, private ocupationService : OcupationService, private messageService: MessagesService, private loadingService: LoadingService){}

  occuped: boolean | undefined;
  message: string | undefined
  messages : any
  selectedIndex: number = 0
  loading: boolean = false

  private messageSub: Subscription | undefined;
  private statusSub: Subscription | undefined;
  private loadingSub: Subscription | undefined;

  ngOnInit(){
    this.isDarkTheme = localStorage.getItem('isDarkTheme') == "dark-theme"
    this.onChangeTheme()
    this.getStatus()
    this.getMessages()
    setInterval(() => {
      this.getStatus()
      this.getMessages()
    }, 1000)
    this.loadingSub = this.loadingService.getLoadingUpdateListener()
      .subscribe((loading: boolean) => {
        this.loading = loading
      })
    this.messageSub = this.messageService.getMessageUpdateListener()
      .subscribe((messages: any) => {
        this.messages = messages
      })
    this.statusSub = this.ocupationService.getStatusUpdateListener()
      .subscribe((status: any) => {
        this.occuped = status
      })
    if (location.hash == "#pagini") {
      this.selectedIndex = 1
    }
    else if (location.hash == "#fisiere") {
      this.selectedIndex = 2
    }
  }

  changeMenu(index: any){
    if (index == 0) {
      location.href = location.origin + '#articole'
      return
    }
    else if (index == 1){
      location.href = location.origin + '#pagini'  
      return
    }
    location.href = location.origin + '#fisiere'
  }

  onChangeTheme(){
    let theme = this.isDarkTheme ? "dark-theme" : "light-theme"
    document.body.className = "mat-typography " + theme
    this.componentCssClass = theme;
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? "dark-theme" : "light-theme")
    this.isDarkTheme = !this.isDarkTheme
  }

  getStatus(){
    this.ocupationService.getStatus()
  }

  getMessages(){
    this.messageService.getMessages()
  }

  onDeleteMessages(id : string){
    this.messageService.removeMessage({id})
    this.snackBar.open("Ai șters un mesaj", "", {duration: 3000});
  }

  async onChangeStatus() {
    await this.ocupationService.changeStatus({'status': this.occuped})
  }

  async onAddMesage(messageForm : NgForm){
    await this.messageService.sendMessage({text: messageForm.value.text})
    this.snackBar.open("Ai adăugat un mesaj nou", "", {duration: 3000});
    messageForm.reset()
  }
}
