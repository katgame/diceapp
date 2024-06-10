declare module '@3d-dice/dice-box' {
    export class DiceBox {
      constructor(container: HTMLElement, options?: any);
      init(): void;
      roll(values: number[]): void;
    }
  }
  