import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponentContainer from '../container_components/header-container/header.page';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponentContainer],
  template: `
  <header-container></header-container>
    <router-outlet></router-outlet>
  `,
})
export default class LegalComponent {}