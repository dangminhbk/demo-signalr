import { Component, Inject, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-test-signal-r',
  templateUrl: './test-signal-r.component.html',
  styleUrls: ['./test-signal-r.component.css']
})
export class TestSignalRComponent implements OnInit {

  private _hubConnection: HubConnection;
  private _url: string;

  chat: string;
  sender: string;

  chatList = [];

  constructor(
    @Inject('BASE_URL') baseUrl: string
  ) {
    this._url = baseUrl;
   }

  ngOnInit() {
    this._hubConnection =
      (new HubConnectionBuilder)
        .withUrl(`${this._url}ChatHub`)
        .build();

    this._hubConnection.start().then(c=> {
      this._hubConnection.on("ReceiveMessage", (u, m)=> {
        this.chatList.push({
          sender: u,
          message: m
        })
      })
    });
  }

  sendMessage() {
    this._hubConnection.invoke("SendMessage", this.sender, this.chat);
  }

}
