import { Component, OnDestroy, OnInit } from '@angular/core';
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
export default class GamePageComponent implements OnInit, OnDestroy {
  gameUrl: SafeResourceUrl | undefined;
  sessionInfo: any
  session: any;
  private broadcastSubscription!: Subscription;
  private socket: Socket;

  constructor(  private gameService : GameService,private sanitizer: DomSanitizer,private socketService: SocketService, private gameStoreService: GameStoreService, private diceService: DiceService) {
    this.socket = io('http://localhost:3000').connect(); 

  }
  ngOnInit(): void {
    //this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/room/');
    console.log(`ngOnInit test`);
    this.gameStoreService.$sessionInfo.subscribe((data) => {
      this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/room/' + data.sessionInfo.id);
      console.log('sessionInfo Gamer', data);
     //this.socketService.joinRoom(data.sessionInfo.id,)
      this.sessionInfo = data;
    })
    this.broadcastSubscription = this.socketService.onBroadcast('messageFromServer').subscribe((data: any) => {
    
      console.log('Message from server:', data);
    });
    this.broadcastSubscription = this.socketService.onBroadcast('send_message_to_room').subscribe((data: any) => {
      
      console.log('Message from server send_message_to_room:', data);
      switch(data.messageType) {
        case 0 : 
          //update users on screen
          this.updatePlayerUI();
        break;
        case 1 : 
        break;
        case MessageType.default : 
        break;

      }
    });
  //   this.socket.on('send_message_to_room', (message : Message) => {
  //     console.log(`roomMessage called: ${message}`);
  //     switch(message.messageType) {
  //       case MessageType.joinGame : 
  //         //update users on screen
  //         this.updatePlayerUI();
  //       break;
  //       case MessageType.gameResult : 
  //       break;
  //       case MessageType.default : 
  //       break;

  //     }
  // });
   

  }
  updatePlayerUI() {
   
    this.diceService.getSessionInformationById(this.sessionInfo.sessionInfo.id).subscribe((res: any) => {
      if(res) {
        
        this.gameService.JoinGame(res);
      }
    } )
  } 
  ngOnDestroy(): void {
    if (this.broadcastSubscription) {
      this.broadcastSubscription.unsubscribe();
    }
  }

}

