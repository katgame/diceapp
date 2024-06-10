import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' , 'rejectUnauthorized': 'false' },)
  };
  
  @Injectable({ providedIn: 'root' })
  export class DiceService {

    private hostService: string = 'https://mabushait.co.za:2021/';
    constructor(
      private http: HttpClient,
    //   @Inject('ENVIRONMENT') private environment: any
    ) {}
  



    public login(credentials : any): Observable<any> {

        return this.http.post( this.hostService + 'api/Authentication/login-user', {
            email: credentials.username,
            password: credentials.password
        }, httpOptions)
    }

    public requestSession(schoolId : any, userId: any): Observable<any> {
        return this.http.post( this.hostService + 'api/Game/request-session', {
            schoolId: schoolId,
            userId: userId
        }, httpOptions)
    }

    public getSchools(): Observable<any> {
        return this.http.get( this.hostService + 'api/Dashboard/get-dashboard', httpOptions)
    }

    public getSessionInformationById(sessionId: any): Observable<any> {
        return this.http.get( this.hostService + 'api/Game/session-information-by-id/'+ sessionId, httpOptions)
    }
    public getAllSessionInformation(): Observable<any> {
        return this.http.get( this.hostService + 'api/Game/session-information', httpOptions)
    }

    public ping(userId : any, sessiondId: any, gameSessionId: any ): Observable<any> {
        return this.http.post( this.hostService + 'api/Game/ping-event', {
            userId: userId,
            sessionId : sessiondId,
            gameSessionId : gameSessionId
        }, httpOptions)
    }

    public creditAccount(userId : any, tokens: any ): Observable<any> {
        return this.http.post( this.hostService + 'api/Account/credit-funds', {
            userId: userId,
            price : tokens
        }, httpOptions)
    }

    public debitAccount(userId : any, tokens: any ): Observable<any> {
        return this.http.post( this.hostService + 'api/Account/debit-funds', {
            userId: userId,
            price : tokens
        }, httpOptions)
    }

    public getUserAccountByUserId(userId: any): Observable<any> {
        return this.http.get( this.hostService + 'api/Account/get-account/'+ userId, httpOptions)
    }

    public getUserAccountBalanceByUserId(userId: any): Observable<any> {
        return this.http.get( this.hostService + 'api/Account/get-account-balance/'+ userId, httpOptions)
    }

    public registerUser(userName: string, email: string, password: string, role: string): Observable<any> {
        return this.http.post( this.hostService + 'api/Authentication/register-user', {
            userName: userName,
            email : email,
            password: password,
            role : role
        }, httpOptions)
    }

    

    // public UpdateUserAccount(userId: any, tokens: any, ): Observable<any> {
    //     return this.http.get( this.hostService + 'api/Account/get-account-balance/'+ userId, httpOptions)
    // }
  }
  