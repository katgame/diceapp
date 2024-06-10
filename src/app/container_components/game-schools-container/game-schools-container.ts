import { Component } from '@angular/core';
import { GameDataStoreService } from '../../store/game-data.store';
import GameSchoolsComponent from '../../view_components/game-schools/game-schools.component';
import { GameStoreService } from '../../store/game.store';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'game-schools-container',
  standalone: true,
  imports: [GameSchoolsComponent],
  template: `
     @if (schools && profile && loginData) {
      <game-schools 
        [profile]="profile" 
        [schools]="schools"
        [loginData]="loginData"
      ></game-schools>
    } 

  `
})
export default class GameSchoolsComponentContainer {
    schools: any
    profile: any
    loginData: any
    constructor(
      private gameStoreService: GameStoreService, 
    ) {
    
    }

    ngOnInit() {
      this.gameStoreService.$userProfile.subscribe((profile) => {
        this.profile = profile
      })
      this.gameStoreService.$loginData.subscribe((loginData) => {
        this.loginData = loginData
      })
      this.gameStoreService.$schools.subscribe((schools) => {
        this.schools = schools
      })
    }

}

