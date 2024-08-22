import { Injectable, computed, effect, signal } from '@angular/core';

import { toObservable } from '@angular/core/rxjs-interop';

// interfac Player

interface GameContainer {
  game: {
    schools: {
      active: boolean;
    };
    play: {
      active: boolean;
    };
  };
}

interface SchoolContainer {
  active: boolean;
  buyInFee: number;
  createdDate: string;
  description: string;
  id: string;
  image: string;
  maxPlayers: number;
  price: number;
  session: string[];
  title: string;
  updatedDate: string;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  duration: number;
  strokeColor: string;
  firstName: string;
  lastName: string;
  tokens: number;
  avatar: string;
  leftPosition: string;
  topPosition: string;
  reverse: boolean;
  start: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  /*
    ------------------------------------------------------------
    1. Create Signals
    ------------------------------------------------------------

  */
  private readonly state = {
    // Player 1 Signals

    $containers: signal<GameContainer>({} as GameContainer),
    $schools: signal<any[]>([]),
    $userProfile: signal<UserProfile>({} as UserProfile),
    $sessionInfo: signal<any>({} as any),
    $loginData: signal<any>({} as any),
    $gameSession: signal<any>({} as any),
    $gameState: signal<any>({} as any),
  } as const;

  /*
    ------------------------------------------------------------
    2. Create Observables
    ------------------------------------------------------------

  */
  // Meta Data Observables
  public readonly $containers = toObservable(
    this.state.$containers.asReadonly()
  );
  public readonly $schools = toObservable(this.state.$schools.asReadonly());
  public readonly $userProfile = toObservable(
    this.state.$userProfile.asReadonly()
  );
  public readonly $sessionInfo = toObservable(
    this.state.$sessionInfo.asReadonly()
  );
  public readonly $loginData = toObservable(this.state.$loginData.asReadonly());
  public readonly $gameSession = toObservable(
    this.state.$gameSession.asReadonly()
  );
  public readonly $gameState = toObservable(this.state.$gameState.asReadonly());

  /*
    ------------------------------------------------------------
    3. Constructor & Effects
    ------------------------------------------------------------

  */

  constructor() {
    effect(() => {
      const signals = [
        { id: '$containers', signal: this.state.$containers() },
        { id: '$schools', signal: this.state.$schools() },
        { id: '$userProfile', signal: this.state.$userProfile() },
        { id: '$sessionInfo', signal: this.state.$sessionInfo() },
        { id: '$loginData', signal: this.state.$loginData() },
        { id: '$gameSession', signal: this.state.$gameSession() },
        { id: '$gameState', signal: this.state.$gameState() },
      ];
      console.log('signals: ', signals);
    });
  }

  /*
    ------------------------------------------------------------
    4. Methods for Setters and getters
    ------------------------------------------------------------

  */
  // Setters

  // Set Game State

  setGameState(gameState: any) {
    this.state.$gameState.set(gameState);
  }

  // Set Game Session

  setGameSession(gameSession: any) {
    this.state.$gameSession.set(gameSession);
  }

  // Set School Container

  setSchoolsContainer(schools: any[]) {
    this.state.$schools.set(schools);
  }

  // Set Login Data

  setLoginData(loginData: any) {
    this.state.$loginData.set(loginData);
  }

  // Set session Info

  setSessionInfo(sessionInfo: any) {
    this.state.$sessionInfo.set(sessionInfo);
  }

    // Set session Info

    clearSessionInfo(sessionInfo: any) {
      this.state.$sessionInfo.set(null);
    }

  // set Default Game Container

  setDefaultGameContainer() {
    this.state.$containers.set({
      game: { schools: { active: true }, play: { active: false } },
    });
  }

  // set Game Container

  setGameContainer(gameContainer: GameContainer) {
    this.state.$containers.set(gameContainer);
  }

  // set Default Schools

  // set Default User Profile

  setUserProfile(user: UserProfile) {
    this.state.$userProfile.set(user);
  }

  // Getters

  // Get all states

  getStates() {
    return this.state;
  }
}
