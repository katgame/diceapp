import { Injectable, computed, effect, signal } from '@angular/core';

import { DiceService } from '../services/game-api.service';
import { toObservable } from '@angular/core/rxjs-interop';

// interfac Player



@Injectable({
  providedIn: 'root'
})
export class GameDataStoreService {

  
  /*
    ------------------------------------------------------------
    1. Create Signals
    ------------------------------------------------------------

  */
  private readonly state = {

    $dashboard: signal<unknown>(null),
    $requestSessionInfo: signal<unknown>(null),
    $playerInformation: signal<unknown>(null),
    $playerAccount: signal<unknown>(null),
    $playerPingRequest: signal<unknown>(null),
    $playerPingResponse: signal<unknown>(null),
  } as const;

  /*
    ------------------------------------------------------------
    2. Create Observables
    ------------------------------------------------------------

  */
  // Meta Data Observables
    public readonly $dashboard = toObservable(this.state.$dashboard.asReadonly());
    public readonly $playerInformation = toObservable(this.state.$playerInformation.asReadonly());
    public readonly $playerAccount = toObservable(this.state.$playerAccount.asReadonly());
    public readonly $playerPingRequest = toObservable(this.state.$playerPingRequest.asReadonly());
    public readonly $playerPingResponse = toObservable(this.state.$playerPingResponse.asReadonly());

    public readonly $requestSessionInfo = toObservable(this.state.$playerPingResponse.asReadonly());
  /*
    ------------------------------------------------------------
    3. Constructor & Effects
    ------------------------------------------------------------

  */

  constructor(private diceApi: DiceService) { 
    effect(() => {
      const signals = [
        { id: '$dashboard', signal: this.state.$dashboard()},
        { id: '$playerInformation', signal: this.state.$playerInformation()},
        { id: '$playerAccount', signal: this.state.$playerAccount()},
        { id: '$playerRequest', signal: this.state.$playerPingRequest()},
        { id: '$playerPingResponse', signal: this.state.$playerPingResponse()},
        { id: '$requestSessionInfo', signal: this.state.$requestSessionInfo()},
      ]
    //  console.log('signals: ', signals);
    })
    
  }
  
  /*
    ------------------------------------------------------------
    4. Methods for Setters and getters
    ------------------------------------------------------------

  */

    public getDashboard = () => {
      this.diceApi.getSchools().subscribe((res: any) => {
        this.state.$dashboard.set(res);
       });
    };

    public requestSession = (schoolId: string, userId: string) => {
      this.diceApi.requestSession(schoolId,userId).subscribe((res: any) => {
        this.state.$requestSessionInfo.set(res);
       });
    };

    public getUserAccountInformation = (userId: any) => {
      this.diceApi.getSchools().subscribe((res: any) => {
        this.state.$playerAccount.set(res);
       });
    };

    public creditAccount = () => {
      this.diceApi.getSchools().subscribe((res: any) => {
        this.state.$dashboard.set(res);
       });
    };

    public debitAccount = () => {
      this.diceApi.getSchools().subscribe((res: any) => {
        this.state.$dashboard.set(res);
       });
    };

    public pingEvent = (request: any) => {
      this.diceApi.ping( request.userId,request.sessionId , request.gameSessionId).subscribe((res: any) => {
        this.state.$dashboard.set(res);
       });
    };
    // Setters
    public  setPlayerPingRequest = (userId: string, sessionId: string, gameSessionId: string) => {
      const request = {
        userId: userId,
        sessionId: sessionId,
        gameSessionId: gameSessionId
      }
      this.state.$playerPingRequest.set(request);
      
    } 

    public setPlayerInformation = (data :any) => {
      this.state.$playerInformation.set(data.userDetails);
      this.state.$playerAccount.set(data.userAccount);
    } 
    public setrequestSessionInfo = (data :any) => {
      this.state.$requestSessionInfo.set(data);
    } 
    // Getters 

}
