import { ISuccess } from "../../types";
import { IEvents } from "../base/events";

export class Success implements ISuccess {
    formSuccess: HTMLElement;
    totalSum: HTMLElement;
    buttonSuccess: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.formSuccess = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
        this.totalSum = this.formSuccess.querySelector('.order-success__description') as HTMLElement;
        this.buttonSuccess = this.formSuccess.querySelector('.button') as HTMLButtonElement;
        this.buttonSuccess.addEventListener('click', () => { this.events.emit('success:close') }); 
    }

    set price(value: number) {
        this.totalSum.textContent = `Списано ${value} синапсов`;
    }

    render(): HTMLElement {
        // Каждый раз создаём новый элемент из шаблона
        const formSuccess = this.formSuccess.cloneNode(true) as HTMLElement;
        this.totalSum = formSuccess.querySelector('.order-success__description') as HTMLElement;
        this.buttonSuccess = formSuccess.querySelector('.button') as HTMLButtonElement;
        this.buttonSuccess.addEventListener('click', () => { 
            this.events.emit('success:close');
        });
        return formSuccess;
    }

}