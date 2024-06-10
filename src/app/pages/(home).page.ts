import { Component } from '@angular/core';
import HeaderComponentContainer from '../container_components/header-container/header.page';
import { RouteMeta } from '@analogjs/router';
import { RouterLink } from '@angular/router';
import { redirectIfLoggedOutServerGuard } from '../guards/auth.guard';

export const routeMeta: RouteMeta = {
  title: 'Home',
  canActivate: [redirectIfLoggedOutServerGuard],
  providers: [],
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponentContainer],
  template: `
    <header-container></header-container>
    <section class="py-4 lg:pt-20 lg:pb-16 flex flex-col mx-auto max-w-screen-xl">
    <h1 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white  lg:mb-7">Dice App Pages</h1>
      <ul class="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400 flex flex-col">
          <li>
              Authentication (auth)
              <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                  <li><a href="/login">Login</a></li>
                  <li><a href="/signup">Sign Up</a></li>
                  <li><a href="/reset-password">Reset Password</a></li>
                  
              </ol>
          </li>
          <li>
              Game (game)
              <ul class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                <li><a href="/game">Game</a></li>
              </ul>
          </li>
          <li>
              Dashboard (schools)
              <ul class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                <li><a href="/dashboard">dashboard</a></li>
              </ul>
          </li>
          <li>
              Legal (legal)
              <ul class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                  <li><a href="/copyright">Copyright</a></li>
                  <li><a href="/privacy">Privacy</a></li>
                  <li><a href="/terms">Terms</a></li>
              </ul>
          </li>
          <li>
              Payment (payment)
              <ul class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                  <li><a href="/payment">Payment</a></li>
              </ul>
          </li>
      </ul>

    </section>

  `,
  styles: [
    `

    `,
  ],
})
export default class HomeComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
