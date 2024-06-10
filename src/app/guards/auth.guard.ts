import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable, NgZone, inject } from '@angular/core';

import { TokenStorageService } from './token-storage.service';

//@Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private router: Router,
//     private tokenStorage: TokenStorageService
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const currentUser = this.tokenStorage.getUser();
//     if (currentUser) {
//       // role not authorised so redirect to home page
//       this.router.navigate(['']);
//       return true;

//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }

// redirect-if-logged-out-server.guard.ts
export const redirectIfLoggedOutServerGuard: CanActivateFn = async () => {
    const router = inject(Router);
    const ngZone = inject(NgZone);

      const userServerService = inject(TokenStorageService);
      const isLoggedIn = await userServerService.getUser();
      if (!isLoggedIn) {
        ngZone.run(() => {
          router.navigate(['login']);
        });
        return false;
      }
      return true;

  };

  export const redirectIfLoggedInServerGuard: CanActivateFn = async () => {

 
      const userServerService = inject(TokenStorageService);
      const router = inject(Router);
      const ngZone = inject(NgZone);
      const isLoggedIn = await userServerService.getUser();
      if (isLoggedIn) {
        ngZone.run(() => {
          router.navigate(['game']);
        })
        return false;
      }
      return true;

  };