import { Component } from '@angular/core';
import HeaderComponentContainer from '../container_components/header-container/header.page';
import { RouteMeta } from '@analogjs/router';
import { RouterOutlet } from '@angular/router';
import { redirectIfLoggedOutServerGuard } from '../guards/auth.guard';

export const routeMeta: RouteMeta = {
  title: 'Game',
  canActivate: [redirectIfLoggedOutServerGuard],
  providers: [],
};

@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponentContainer],
  template: `

    <router-outlet></router-outlet>
  `,
})
export default class GameLayoutComponent {}