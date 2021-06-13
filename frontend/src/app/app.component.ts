import { Component } from '@angular/core';
import { MessagesService } from './messages.service';
import { StatusService } from './status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (private status: StatusService, private messageService: MessagesService){}

  occuped: boolean | undefined;
  message: string | undefined
  messages : any

  ngOnInit():void {
    this.getStatus()
    this.getMessages()
    let a = setInterval(() => {
      this.getStatus()
      this.getMessages()
    }, 1000)
  }

  getStatus(){
    this.status.getStatus().subscribe(res => {
      this.occuped = res["occuped"];
    })
  }

  getMessages(){
    this.messageService.getMessages().subscribe(res => {
      this.messages = res["messages"];
    })
  }

  changeStatus():void {
    this.status.changeStatus({'status': this.occuped}).subscribe()
  }

  sendMessage(e):void{
    if (e.key == "Enter"){
      this.messageService.sendMessage({text: this.message}).subscribe(res => {
        this.message = ""
      })
    }
  }
}
