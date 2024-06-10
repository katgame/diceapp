import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [CommonModule],
    template: `
    
    <section class="py-4 lg:pt-20 lg:pb-16 ">
    <!-- <h1 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white  lg:mb-12">Dice App Payment Page</h1> -->
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mx-auto max-w-6xl">
    <h1 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white  lg:mb-12">Buy Tokens</h1>

      <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
        <form action="#" class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8">
          <div class="mb-6 grid grid-cols-2 gap-4">
            <div class="col-span-2 sm:col-span-1">
              <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> How many tokens do you want to purchase? </label>
              <input type="text" id="full_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="10" required />
            </div>


           
          </div>

          <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay now</button>
        </form>

        <div class="mt-6 grow sm:mt-8 lg:mt-0 w-96">
          <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tokens</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">200</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Amount</dt>
                <dd class="text-base font-medium text-green-500">R200.00</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">R0</dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd class="text-base font-bold text-gray-900 dark:text-white">R200.00</dd>
            </dl>
          </div>

          <div class="mt-6 flex items-center justify-center gap-8">
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
          </div>
        </div>
      </div>

      <p class="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
        Payment processed by <a href="#" title="" class="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500">Google Pay</a> for <a href="#" title="" class="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500">Dice App</a>
        - South Africa
      </p>
    </div>
  </div>
</section>



`
})
export default class PaymentComponent {

    constructor() {
    }

}

