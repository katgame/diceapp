import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import GameSchoolsComponentContainer from '../../container_components/game-schools-container/game-schools-container';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, GameSchoolsComponentContainer],
    template: `
    
    <section class="py-4 lg:pt-20 lg:pb-16 flex flex-col mx-auto max-w-screen-xl">

        <div class="relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[14px] rounded-[2.5rem] h-[635px] w-[1290px] overflow-hidden">


            <game-schools-container></game-schools-container>
            
        </div>
        <div class="flex gap-4 items-center justify-center">
        <!-- <button class="text-white inline" (click)="schools()">schools</button>
        <button class="text-white inline" (click)="play()">Play</button> -->
        </div>

    </section>
`
})
export default class DashboardComponent {

    constructor(private gameService: GameService) {
        this.gameService.initializeGameStore()
    }

}

