import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { PLATFORM_ID, inject } from "@angular/core";
import { from, lastValueFrom } from "rxjs";

import { TokenStorageService } from "./token-storage.service";
import { isPlatformServer } from "@angular/common";

// auth-server.interceptor.ts
export const authServerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  platformId = inject(PLATFORM_ID),
  userServerService = inject(TokenStorageService)
) => {
  return from(
    handleAuthServerInterceptor(req, next, platformId, userServerService)!
  )!;
};

async function handleAuthServerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  location: Object,
  userServerService: TokenStorageService
) {
  if (isPlatformServer(location)) {
    let headers = new HttpHeaders();
 
    const token = userServerService.getToken();
    console.log('auth interceptor : ', token);
    headers = headers.set('Authorization', token);

  //   const cookiedRequest = req.clone({
  //     headers,
  //   });

  //   return lastValueFrom(next(cookiedRequest));
  // } else {
  //   return lastValueFrom(next(req));
  // }
  }
}