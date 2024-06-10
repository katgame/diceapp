import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Message, MessageType } from '../../../types/message';
import { Socket, io } from 'socket.io-client';

import { CommonModule } from '@angular/common';
import { DiceService } from '../../services/game-api.service';
import GameControlsComponent from '../../view_components/game-controls/game-controls.component';
import { GameService } from '../../services/game.service';
import { GameStoreService } from '../../store/game.store';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [CommonModule, GameControlsComponent],
    schemas: [], 
    template: `
  
    <section class="w-screen h-screen bg-[url('/public/assets/game-src/bg.jpg')]" >
      <iframe [src]="gameUrl" frameborder="0" class="w-screen h-screen"></iframe>
      <game-controls [sessionInfo]="sessionInfo"></game-controls>
    </section>

`
})
export default class GamePageComponent {
  gameUrl: SafeResourceUrl | undefined;
  sessionInfo: any
  session: any;
  private broadcastSubscription!: Subscription;
  private socket: Socket;
  constructor(private sanitizer: DomSanitizer,private socketService: SocketService, private gameStoreService: GameStoreService, private diceService: DiceService) {
    this.socket = io('http://localhost:3000'); 

  }
  ngOnInit(): void {
    //this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/room/');
    console.log(`ngOnInit test`);
    this.gameStoreService.$sessionInfo.subscribe((data) => {
      this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/room/' + data.sessionInfo.id);
     // console.log('sessionInfo Gamer', data.sessionInfo.id);
     //this.socketService.joinRoom(data.sessionInfo.id,)
      this.sessionInfo = data;
    })

    this.socket.on('roomMessage', (message : Message) => {
      console.log(`roomMessage called: ${message}`);
      switch(message.messageType) {
        case MessageType.joinGame : 
          //update users on screen
          this.updatePlayerUI();
        break;
        case MessageType.gameResult : 
        break;
        case MessageType.default : 
        break;

      }
  });
   

  }
  updatePlayerUI() {
   
    this.diceService.getSessionInformationById(this.sessionInfo.sessionInfo.id).subscribe((res: any) => {
      if(res) {
        this.gameStoreService.setSessionInfo(res);
      }
    } )
  } 


}

