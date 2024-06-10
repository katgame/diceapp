import {
  Inject,
  Injectable,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  RendererFactory2,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';//global variable for the storage name for our authentication token
const USER_KEY = 'auth-user';//global variable for the storage name for our authenticated user
const REQUEST_SESSION = 'request-session';//global variable for the storage name for our authenticated user

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private isLocalStorageAvailable = typeof sessionStorage !== 'undefined';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) {

     }

  //logging out the user and clearing the stored session
  logOut() {
    if (isPlatformBrowser(this.platformId)) {
    window.sessionStorage.clear();
    this.router.navigate(['login']);
    }
  }

  //saving the authentication token in the session storage
  public saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  //get the stored authentication token from the session storage
  public getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
    return sessionStorage.getItem(TOKEN_KEY) ?? '';
    } else {return ''}
  }

  //saving the authenticated user in the session storage
  public saveUser(user : any) {
    if (isPlatformBrowser(this.platformId)) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public saveSessionRequestInformation(session : any) {
    if (isPlatformBrowser(this.platformId)) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(session));
    }
  }

  //get the stored authenticated user from the session storage
  public getUser() {
    if (isPlatformBrowser(this.platformId)) {
    // console.log('sessionStorage : ', sessionStorage);
    if(sessionStorage.length > 0) {
      let user = sessionStorage.getItem(USER_KEY);
      return JSON.parse( user ?? '') ;
    }
    return '';
    }
  }
}
