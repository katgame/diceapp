import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { DiceService } from '../../services/game-api.service';
import { GameDataStoreService } from '../../store/game-data.store';
import { GameService } from '../../services/game.service';
import { GameStoreService } from '../../store/game.store';
import { PlayerAvaterComponent } from '../player-avatar/player-avatar.component';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { TokenStorageService } from '../../guards/token-storage.service';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'game-controls',
  standalone: true,
  imports: [CommonModule, PlayerAvaterComponent],
  template: `
    <section
      class="absolute top-0 left-0 w-screen h-screen flex flex-col justify-between"
    >
      <!-- Results -->
      <!-- <div class="absolute w-full top-[35vh] flex justify-center space-x-8 my-4 ">
            <div class="flex flex-row justify-between w-full max-w-screen-lg">
                <div class="flex justify-center space-x-8">
                    <div class="flex flex-col ">
                        <h3 class="text-[1rem] font-bold text-zinc-700">Rolled</h3>
                        <p class="text-[1rem] font-bold text-zinc-700 text-center graffiti-text">{{ scoreResult }}</p>
                    </div>
                    <div class="flex flex-col ">
                        <h3 class="text-[1rem] font-bold text-zinc-700">Rolling</h3>
                        <p class="text-[1rem] font-bold text-zinc-700 text-center graffiti-text">{{ '10'}}</p>
                    </div>
                    <div class="flex flex-col ">
                        <h3 class="text-[1rem] font-bold text-zinc-700">Rolls</h3>
                        <p class="text-[1rem] font-bold text-zinc-700 text-center graffiti-text">{{ '16' }}</p>
                    </div>
                </div>

                <div class="flex justify-center space-x-12">
                    <div class="flex flex-col space-y-2">
                        <h3 class="text-[1rem] font-bold text-zinc-700">Winning </h3>
                        <p class="text-[1rem] flex font-bold text-zinc-700">
                            <svg class="shadow fill-white rounded" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12H12.01M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="rgb(63 63 70)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <svg class="shadow fill-white rounded" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12H12.01M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="rgb(63 63 70)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </p>
                        <p class="text-[1rem] flex font-bold text-zinc-700">
                            <svg class="shadow fill-white rounded" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12H12.01M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="rgb(63 63 70)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <svg class="shadow fill-white rounded" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12H12.01M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="rgb(63 63 70)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </p>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <h3 class="text-[1rem] font-bold text-zinc-700">Losing</h3>
                        <p class="text-[1rem] font-bold text-zinc-700 flex">
                            <svg class="shadow fill-white rounded" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.25 7.75H16.255M16.25 16.25H16.255M7.75 7.75H7.755M12 11.75H12.005M7.75 16.25H7.755M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21ZM16.5 7.75C16.5 7.88807 16.3881 8 16.25 8C16.1119 8 16 7.88807 16 7.75C16 7.61193 16.1119 7.5 16.25 7.5C16.3881 7.5 16.5 7.61193 16.5 7.75ZM16.5 16.25C16.5 16.3881 16.3881 16.5 16.25 16.5C16.1119 16.5 16 16.3881 16 16.25C16 16.1119 16.1119 16 16.25 16C16.3881 16 16.5 16.1119 16.5 16.25ZM8 7.75C8 7.88807 7.88807 8 7.75 8C7.61193 8 7.5 7.88807 7.5 7.75C7.5 7.61193 7.61193 7.5 7.75 7.5C7.88807 7.5 8 7.61193 8 7.75ZM12.25 11.75C12.25 11.8881 12.1381 12 12 12C11.8619 12 11.75 11.8881 11.75 11.75C11.75 11.6119 11.8619 11.5 12 11.5C12.1381 11.5 12.25 11.6119 12.25 11.75ZM8 16.25C8 16.3881 7.88807 16.5 7.75 16.5C7.61193 16.5 7.5 16.3881 7.5 16.25C7.5 16.1119 7.61193 16 7.75 16C7.88807 16 8 16.1119 8 16.25Z" stroke="rgb(63 63 70)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <svg class="shadow fill-white rounded" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.25 7.75H16.255M16.25 16.25H16.255M7.75 7.75H7.755M12 11.75H12.005M7.75 16.25H7.755M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21ZM16.5 7.75C16.5 7.88807 16.3881 8 16.25 8C16.1119 8 16 7.88807 16 7.75C16 7.61193 16.1119 7.5 16.25 7.5C16.3881 7.5 16.5 7.61193 16.5 7.75ZM16.5 16.25C16.5 16.3881 16.3881 16.5 16.25 16.5C16.1119 16.5 16 16.3881 16 16.25C16 16.1119 16.1119 16 16.25 16C16.3881 16 16.5 16.1119 16.5 16.25ZM8 7.75C8 7.88807 7.88807 8 7.75 8C7.61193 8 7.5 7.88807 7.5 7.75C7.5 7.61193 7.61193 7.5 7.75 7.5C7.88807 7.5 8 7.61193 8 7.75ZM12.25 11.75C12.25 11.8881 12.1381 12 12 12C11.8619 12 11.75 11.8881 11.75 11.75C11.75 11.6119 11.8619 11.5 12 11.5C12.1381 11.5 12.25 11.6119 12.25 11.75ZM8 16.25C8 16.3881 7.88807 16.5 7.75 16.5C7.61193 16.5 7.5 16.3881 7.5 16.25C7.5 16.1119 7.61193 16 7.75 16C7.88807 16 8 16.1119 8 16.25Z" stroke="rgb(63 63 70)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                        </p>
                    </div>
                     <div class="flex flex-col space-y-2">
                        <h3 class="text-lg font-bold text-zinc-700">Press Mores</h3>
                        <p class="text-lg font-bold text-zinc-700">{{ '' }}</p>
                    </div> 
                </div>
            </div>
        </div> -->
      <!-- Avatars and Scores Section -->
      <div class="flex justify-center space-x-8 my-4">
        <div *ngIf="sessionInfo">
          <player-avatar
            *ngFor="let player of sessionInfo.gameSession"
            [player]="player"
          ></player-avatar>
        </div>
      </div>

      <!-- Actions Panel -->
       <div class="flex justify-center space-x-4 my-4 relative -top-12">
            @if(sessionInfo) {
            <button class="bg-[#d9d6ab] border-1 outline-zinc-600 outline outline-2 bg-opacity-40 text-zinc-700 font-bold py-2 px-4 rounded-2xl hover:bg-zinc-200" (click)="throwDice()">
                Throw Dice
            </button>
            <button class="bg-[#d9d6ab] border-1 outline-zinc-600 outline outline-2 bg-opacity-40 text-zinc-700 font-bold py-2 px-4 rounded-2xl hover:bg-zinc-200" (click)="pressMore()">
                Press More
            </button>
            } 
            <button class="bg-[#d9d6ab] border-1 outline-zinc-600 outline outline-2 bg-opacity-40 text-zinc-700 font-bold py-2 px-4 rounded-2xl hover:bg-red-700"(click)="exitGame(null)">
                Give Up
            </button>
            
        </div> 

      <div class="flex flex-row-reverse">
            <div class="relative bottom-[15vh] right-[3vh] md:right-[15vh] md:bottom-[15vh]">

                <button (click)="exitGame(null)" type="button" class="group absolute bg-white bg-opacity-10 -top-[5rem] w-14 h-14 text-white border-2 border-white hover:bg-white hover:text-zinc-900 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-white dark:text-white dark:hover:text-zinc-900 dark:focus:ring-blue-50 dark:hover:bg-white">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V12M8 8.99951C7.37209 9.83526 7 10.8742 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 10.8742 16.6279 9.83526 16 8.99951M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                    </button>  
                
                <button (click)="pressMore()" type="button" class="group bg-white bg-opacity-10  absolute -top-[1rem] -left-[5rem] w-14 h-14 text-white border-2 border-white hover:bg-white hover:text-zinc-900 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-white dark:text-white dark:hover:text-zinc-900 dark:focus:ring-blue-50 dark:hover:bg-white">
                    <svg  class="group-hover:fill-black" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} </style> <circle class="st0" cx="16" cy="16" r="10"></circle> <circle class="st0" cx="16" cy="16" r="14"></circle> <line class="st0 " x1="16" y1="2" x2="16" y2="6"></line> <line class="st0" x1="6.1" y1="6.1" x2="8.9" y2="8.9"></line> <line class="st0" x1="2" y1="16" x2="6" y2="16"></line> <line class="st0" x1="6.1" y1="25.9" x2="8.9" y2="23.1"></line> <line class="st0" x1="16" y1="30" x2="16" y2="26"></line> <line class="st0" x1="25.9" y1="25.9" x2="23.1" y2="23.1"></line> <line class="st0" x1="30" y1="16" x2="26" y2="16"></line> <line class="st0" x1="25.9" y1="6.1" x2="23.1" y2="8.9"></line> <polygon class="st0" points="16,11 12,16 16,21 20,16 "></polygon> </g></svg>
                </button>  

                <button (click)="throwDice()" type="button" class="group bg-white bg-opacity-10  text-white border-2 border-white hover:bg-white hover:text-zinc-900 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-white dark:text-white dark:hover:text-zinc-900 dark:focus:ring-blue-50 dark:hover:bg-white">
                    <svg  [ngClass]="{ 'animate-spin': isSpinning }" class="fill-white group-hover:fill-black group-hover:stroke-black" width="60px" height="60px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path class="group-hover:stroke-black" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" d="M448,341.37V170.61A32,32,0,0,0,432.11,143l-152-88.46a47.94,47.94,0,0,0-48.24,0L79.89,143A32,32,0,0,0,64,170.61V341.37A32,32,0,0,0,79.89,369l152,88.46a48,48,0,0,0,48.24,0l152-88.46A32,32,0,0,0,448,341.37Z"/><polyline class="group-hover:stroke-black" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" points="69 153.99 256 263.99 443 153.99"/><line class="group-hover:stroke-black" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" x1="256" y1="463.99" x2="256" y2="263.99"/><ellipse cx="256" cy="152" rx="24" ry="16"/><ellipse cx="208" cy="296" rx="16" ry="24"/><ellipse cx="112" cy="328" rx="16" ry="24"/><ellipse cx="304" cy="296" rx="16" ry="24"/><ellipse cx="400" cy="240" rx="16" ry="24"/><ellipse cx="304" cy="384" rx="16" ry="24"/><ellipse cx="400" cy="328" rx="16" ry="24"/></svg>
                    <span class="sr-only">Icon description</span>
                </button>

            </div>
        </div> 
    </section>
  `,
  styles: [
    `
      /* Add a custom animation if desired */
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .animate-spin {
        animation: spin 1s linear infinite;
      }
    `,
  ],
})
export default class GameControlsComponent implements OnInit, AfterViewInit {
  @Input() schools: any;
  @Input() profile: any;
  @Input() loginData: any;
  @Input() sessionInfo: any;
  isSpinning = false;
  scoreResult: string = '';
  constructor(
    private diceApi: DiceService,
    private router: Router,
    private gameService: GameService,
    private ngZone: NgZone,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //  window.addEventListener('message', this.receiveMessage.bind(this), false);
    // Register icons
  }
  ngAfterViewInit() {
    // Check if the user is logged in
    // if(!this.sessionInfo) {
    //     this.exitGame(null);
    // }
  }

  receiveMessage(event: MessageEvent): void {
    // Ensure the message is from the expected origin
    if (event.origin === 'http://localhost:3000') {
      this.ngZone.run(() => {
        this.scoreResult = event.data.score;
        console.log('Score Result:', this.scoreResult);
      });
    }
  }

  log() {
    console.log('sessionInfo ', this.sessionInfo);
  }
  throwDice() {
    this.startSpinning();
    this.socketService.throwDice();
    const throwDice = fetch('http://localhost:3000/throwDice/room/' + this.sessionInfo.id);
    console.log('here:', document.querySelectorAll('iframe'));
    document
      .querySelectorAll('iframe')
      .forEach((item: any) =>
        console.log(
          'Frame:::',
          item.contentWindow.document.body.querySelectorAll('#score-result')
        )
      );
  }

  startSpinning() {
    this.isSpinning = true;
    setTimeout(() => {
      this.isSpinning = false;
    }, 1000); // Spins for 1 seconds
  }

  exitGame(navigationExtras: any) {
    this.ngZone.run(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  pressMore() {
    alert('Press More');
  }
}
