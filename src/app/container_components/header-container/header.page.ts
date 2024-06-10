import { Component } from '@angular/core';
import HeaderComponent from '../../view_components/header/header.component';
@Component({
  selector: 'header-container',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <header></header>
  `
})
export default class HeaderComponentContainer {

    constructor() {}

}

