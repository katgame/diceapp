// Start angular injectable service
import { Injectable } from '@angular/core';
import { GameStoreService } from '../store/game.store';
import { GameDataStoreService } from '../store/game-data.store';
import { TokenStorageService } from '../guards/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

    constructor(
        private gameStoreService: GameStoreService, 
        private dataStore: GameDataStoreService,  
        private tokenService: TokenStorageService
    ) { }

    initializeGameStore() {
        this.dataStore.getDashboard();
        this.gameStoreService.setDefaultGameContainer()
        this.gameStoreService.setLoginData(this.tokenService.getUser());

        
        this.setUserProfile(this.tokenService.getUser().userDetails, this.tokenService.getUser().userAccount)

        this.dataStore.$dashboard.subscribe((res : any) => {
            this.gameStoreService.setSchoolsContainer(res)
        });
    }
    setUserProfile(profile: any, account: any) {
        const userProfile = {
            id: profile.id,
            username: profile.email,
            email: profile.email,
            duration: 10,
            strokeColor: 'black',
            firstName: profile.name,
            lastName: '',
            tokens: account.accountBalance,
            avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
            leftPosition: '48%',
            topPosition: '30rem',
            reverse: false,
            start: true,
          }
        this.gameStoreService.setUserProfile(userProfile);
    }

    JoinGame(data: any) {
        this.dataStore.setrequestSessionInfo(data);
        this.gameStoreService.setSessionInfo(data);
    }

    getStates() {
        return this.gameStoreService.getStates();
    }
}