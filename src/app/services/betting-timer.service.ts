import { Injectable } from '@angular/core';
import { Observable, timer, map, takeWhile, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BettingTimerService {
  private countdownSeconds = 10;

  constructor() {}

  startTimer(): Observable<number> {
    return timer(0, 1000).pipe(
      map(elapsed => this.countdownSeconds - elapsed),
      takeWhile(timeRemaining => timeRemaining >= 0),
      tap(timeRemaining => {
        if (timeRemaining === 0) {
          console.log('Time is up!');
        }
      })
    );
  }
}
