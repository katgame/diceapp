import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { CircularProgressComponent } from "../circular-progress/circular-progress.component";
import { CommonModule } from '@angular/common';
// [style.left]="player.avatar.leftPosition" [style.top]="player.avatar.topPosition"
@Component({
    selector: 'player-avatar',
    standalone: true,
    template: `
        @if(player) {
            <div class="flex gap-2 items-center z-50" 
                
                [ngClass]="{'flex-row-reverse': player.avatar.reverse}"
                id={{player.avatar.orderId}}
            >
            <circular-progress
                [start]="true"
                [duration]="3"
                [strokeColor]="player.avatar.strokeColor"
                (complete)="completed($event)"
            >
                <img class="w-20 h-20 rounded-full absolute top-[8px] left-[10px]" src={{player.avatar.image}} alt="">
            </circular-progress>
                <!-- <div class="font-medium dark:text-white bg-zinc-900 p-2">
                    <div>{{player.firstName}} {{player.lastName}}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{player.tokens}} tokens</div>
                </div> -->
            </div>
        }
      
    `,
    styles: [`
     
    `],
    imports: [CommonModule, CircularProgressComponent]
})
export class PlayerAvaterComponent  {
    @Input() player: any
    @Output() complete = new EventEmitter<boolean>();
    constructor() {
  
    }

    ngOnInit() {}

    completed(event: any) {
        this.complete.emit(event)
    }




}
