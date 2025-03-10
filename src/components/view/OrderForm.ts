import { IActions, IOrder } from "../../types";
import { IEvents } from "../base/events";

export class OrderForm implements IOrder {
  formOrder: HTMLFormElement;
  buttonAll: HTMLButtonElement[];
  buttonSubmit: HTMLButtonElement;
  formErrors: HTMLElement;
  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.formOrder = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt'));
    this.buttonSubmit = this.formOrder.querySelector('.order__button');
    this.formErrors = this.formOrder.querySelector('.form__errors');

    this.buttonAll.forEach((button) => {
      button.addEventListener('click', () => {
        this.paymentSelect = button.name;
        events.emit('order:paymentSelect', button);
      })
    });

    this.formOrder.addEventListener('input', (e) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const inputName = target.name;
      const inputValue = target.value;
      this.events.emit('order:changeInputAddress', { inputName, inputValue });
    });

    this.formOrder.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit('formContact:open');
    });

  }

  set paymentSelect(paymentMethod: string) {
    this.buttonAll.forEach(button => {
        button.classList.toggle('button_alt-active', button.name === paymentMethod);
    })
  }

  toggleErrors(address: string, payment: string): void {
    if(address !== undefined) {
      this.formErrors.textContent = `Заполните адрес`;
    } else if (payment !== undefined) {
      this.formErrors.textContent = `Выберите способ оплаты`;
    }
  }

  render(): HTMLElement {
    return this.formOrder;
  }
}