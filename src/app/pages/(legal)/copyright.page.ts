import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
    selector: 'app-terms',
    standalone: true,
    imports: [CommonModule],
    template: `
    
    <section class="py-4 lg:pt-20 lg:pb-16 flex flex-col mx-auto max-w-screen-xl">
    <h1 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white  lg:mb-12">Dice App Copyright Page</h1>

    </section>

`
})
export default class CopyrightComponent {

    constructor() {
    }

}

