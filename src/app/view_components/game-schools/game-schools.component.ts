import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NgZone, OnInit } from '@angular/core';
import { Message, MessageType } from '../../../types/message';
import { Socket, io } from 'socket.io-client';

import { CommonModule } from '@angular/common';
import { DiceService } from '../../services/game-api.service';
import { GameDataStoreService } from '../../store/game-data.store';
import { GameService } from '../../services/game.service';
import { GameStoreService } from '../../store/game.store';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { TokenStorageService } from '../../guards/token-storage.service';
import { register } from 'swiper/element/bundle';

@Component({
    selector: 'game-schools',
    standalone: true,
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
    template: `
    
    <section class="relative"> 
        <div class="absolute w-[350px] h-[100vh] bg-gray-800 bg-opacity-95 z-30 flex flex-col justify-start p-[4%] text-xl">
            
            <div class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-700 mb-8">
                <span class="font-bold text-gray-600 dark:text-blue-300 text-2xl">TM</span>
            </div>

            <div class="flex flex-col gap-2">
                <p class="">
                    <span class="font-bold text-gray-300 mr-2">Name:</span>
                    <span class="text-blue-300 font-bold">{{profile.firstName}} {{profile.lastName}}</span>
                </p>
                <p class="">
                    <span class="font-bold text-gray-300 mr-2">Username:</span>
                    <span class="text-blue-300 font-bold">{{profile.username}}</span>
                </p>
                <p class="mb-10">
                    <span class="font-bold text-gray-300 mr-2">Tokens:</span>
                    <span class="text-blue-300 font-bold">{{profile.tokens}}</span>
                </p>
                <a href="/payment" class="text-blue-300 flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563ea" width="32px" height="32px">
                        <circle cx="12" cy="12" r="10" stroke="skyblue" stroke-width="2"></circle>
                        <text x="12" y="16" font-family="Arial" font-size="12" fill="black" text-anchor="middle"></text>
                    </svg>
 
                     Buy More Tokens
                </a>
                <a href="/profile" class="text-zinc-50 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32px" height="32px">
                    <circle cx="12" cy="8" r="4"></circle>
                    <path d="M4,22c0-5,4-8,8-8s8,3,8,8"></path>
                </svg>

                    Update Profile
                </a>
            </div>

        </div>
        <div *ngIf="schools"> 
        <swiper-container slides-per-view="3"  keyboard="true"
        >
        <swiper-slide *ngFor="let school of schools">
            <div class="flex flex-col mx-auto h-[650vh] bg-gray-900 text-white z-30 justify-start p-[5%] border-x-8 border-gray-800 bg-blend-multiply"
                [style.backgroundImage]="'url(' + school.image + ')'">


                <div class="flex flex-col p-6 mx-auto max-w-lg text-center e">
              <h3 class="mb-4 text-2xl font-semibold">School R{{school.price}}</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">{{school.description}}</p>
              <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">R{{school.price}}</span>
                  <span class="text-gray-500 dark:text-gray-400">/game</span>
              </div>
              <!-- List -->
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      <!-- Icon -->
                      <span>&nbsp;</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <!-- Icon -->
                      <span>&nbsp;</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <!-- Icon -->
                      <span>&nbsp;</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <!-- Icon -->
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Players online: <span class="font-semibold">{{school.players}}</span></span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <!-- Icon -->
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Max Players per session: <span class="font-semibold">6</span></span>
                  </li>
              </ul>
              <button (click)="JoinSchool(school)" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-blue-900">Join this school</button>
          </div>
            </div>
        </swiper-slide>

        </swiper-container>
        </div>
    </section>

`
})
export default class GameSchoolsComponent implements OnInit {
    @Input() schools: any;
    @Input() profile: any;
    @Input() loginData: any;
    private socket: Socket;
    constructor(
        private diceApi: DiceService, 
        private router: Router, 
        private gameService: GameService,
        private ngZone: NgZone,
        private socketService: SocketService
    ) {
        this.socket = io('http://localhost:3000');
        register();
    }

    ngOnInit(): void {
    }

    JoinSchool(item: any) {
        this.diceApi.requestSession(item.id, this.loginData.userDetails.id).subscribe((res : any) => {
            if(res) {
                console.log('requestSession res : ' , res)
                let gameUrl = '';
                if(res.isNewSession) {
                    this.socketService.createRoom(res.sessionInfo.id, res.userId);
                } else {
                    this.socketService.joinRoom(res.sessionInfo.id, res.userId);
                    const message = this.joinRoomMessage(); 
                    this.socketService.roomMessage(res.sessionInfo.id, message);
                }
               
             
                const state = this.gameService.getStates();
                this.goToGame(state, res.sessionInfo.id);
                this.gameService.JoinGame(res);

            }
        })
    }
    joinRoomMessage() : Message {
        let req = new Message();
        req.message = 'Joined';
        req.messageType = MessageType.joinGame;
        return req;
    } 
    goToGame(navigationExtras: any, sessionId : any) {
        this.ngZone.run(() => {
            this.router.navigate(['/game'], navigationExtras);
        });
    }
}

