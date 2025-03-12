import { IEvents } from "../base/events";

interface IPage {
    headerBasket: HTMLButtonElement;
    headerBasketCounter: HTMLElement;
    // render(): HTMLElement;
}

export class Page implements IPage {
    headerBasket: HTMLButtonElement;
    headerBasketCounter: HTMLElement;
    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.headerBasket = document.querySelector('.header__basket');
        this.headerBasketCounter = this.headerBasket.querySelector('.header__basket-counter');

        this.headerBasket.addEventListener('click', () => { this.events.emit('basket:open') });
    }

    counterBasket(value: number) {
        this.headerBasketCounter.textContent = String(value);
    }
    
}