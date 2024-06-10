import { Injectable, computed, effect, signal } from '@angular/core';

import { DiceService } from '../services/game-api.service';
import { toObservable } from '@angular/core/rxjs-interop';

// interfac Player



@Injectable({
  providedIn: 'root'
})
export class SessionService {

  
  /*
    ------------------------------------------------------------
    1. Create Signals
    ------------------------------------------------------------

  */
  private readonly state = {

    $sessionInformation: signal<unknown>(null),
    $allsessionInformation: signal<unknown>(null),
  } as const;

  /*
    ------------------------------------------------------------
    2. Create Observables
    ------------------------------------------------------------

  */
  // Meta Data Observables
    public readonly $sessionInformation = toObservable(this.state.$sessionInformation.asReadonly());
    public readonly $allsessionInformation = toObservable(this.state.$allsessionInformation.asReadonly());
  /*
    ------------------------------------------------------------
    3. Constructor & Effects
    ------------------------------------------------------------

  */

  constructor(private diceApi: DiceService) { 
    effect(() => {
      const signals = [
        { id: '$sessionInformation', signal: this.state.$sessionInformation()},
        { id: '$allsessionInformation', signal: this.state.$allsessionInformation()}

      ]
     // console.log('sessionInformation signals: ', signals);
    })
    
  }
  
  /*
    ------------------------------------------------------------
    4. Methods for Setters and getters
    ------------------------------------------------------------

  */

    private getAllSessionInformation = () => {
      this.diceApi.getAllSessionInformation().subscribe((res: any) => {
        this.state.$sessionInformation.set(res);
       });
    };

    private getSessionById = (sessionId: any) => {
      this.diceApi.getSessionInformationById(sessionId).subscribe((res: any) => {
        this.state.$allsessionInformation.set(res);
       });
    };

}
