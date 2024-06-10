import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

import { Injectable } from '@angular/core';
import { UserDetails } from '../../types/user-details';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private messageSubject = new Subject<string>();
  private sessionSubject = new Subject<any>();
  private updateGameStateSubject = new Subject<any>();

  constructor() {
    this.socket = io('http://localhost:3000');
    
    this.socket.on('message', (message: string) => {
      this.messageSubject.next(message);
    });

    this.socket.on('session', (message: any) => {
      this.sessionSubject.next(message);
    });

    this.socket.on('updateGameState', (message: any) => {
      this.updateGameStateSubject.next(message);
    });

  }

  onBroadcast(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });

      // Remove the event listener when the subscription is closed
      return () => {
        this.socket.off(eventName);
      };
    });
  }

  joinRoom(sessionId: string, userId: string): void {
    console.log('joinRoom socket service called')
    this.socket.emit('joinRoom',userId, sessionId);
  }

  roomMessage(sessionId: string, message: any): void {
    console.log('roomMessage socket service called')
    this.socket.emit('send_message_to_room',sessionId, message);
  }


  createRoom(sessionId: string, userId : string): void {
    this.socket.emit('create_room', sessionId, userId);
  }
  addUserToRound(sessionId: string, userId : string): void {
    this.socket.emit('add_player_to_round', sessionId, userId);
  }

  throwDice(): void {
    this.socket.emit('throwDice', {});
  }

  getMessage(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  getSession(): Observable<any> {
    return this.sessionSubject.asObservable();
  }

  getUpdateGameState(): Observable<any> {
    return this.updateGameStateSubject.asObservable();
  }
}

  // private socket: Socket | undefined;
  // private gameSession: GameSession[] = [];

  // constructor() {
  //   this.gameSession = [];
  //   this.setupSocketConnection();
  // }

  // setupSocketConnection() {
  //   this.socket = io('http://localhost:3000'); // Adjust the URL to match your server
  // }



  // joinSession(sessionId: string, userId: any) {
  //   if (this.socket) {
  //     if(this.gameSession.filter(session => session.sessionId === sessionId).length > 0) {

  //     } else {
  //       const newSession: GameSession = {
  //         sessionId,
  //         players: [
  //           {
  //             id: userId,
  //             activePlayer: true,
  //             isMainPlayer: true
  //           }
  //         ]
  //       };

  //       this.gameSession.push(newSession);


  //       const session = {
  //         sessionId: sessionId, 
  //         userId: userId, 
  //         numberOfPlayers: 1, 
  //         activePlayer: true, 
  //         isMainPlayer: true
  //       }

        
  //       this.socket.emit('message', session);
  //     }
  //   }
  // }

  // sendMessage(message: any, message1: any) {
  //   if (this.socket) {
  //     this.socket.emit('message', [
  //       message,
  //       message1
  //     ]);
  //   }
  // }

  // getMessages() {
  //   return new Observable(observer => {
  //     if (this.socket) {
  //       this.socket.on('message', (message) => {
  //         observer.next(message);
  //       });
  //     }
  //   });
  // }
// }
