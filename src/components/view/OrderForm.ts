import { IActions, IOrder } from "../../types";
import { IEvents } from "../base/events";

export class OrderForm implements IOrder {
  formOrder: HTMLFormElement;
  buttonAll: HTMLButtonElement[];
  buttonSubmit: HTMLButtonElement;
  formErrors: HTMLElement;
  private currentAddress: string = '';
  private currentPayment: string = '';

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.formOrder = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt'));
    this.buttonSubmit = this.formOrder.querySelector('.order__button');
    this.formErrors = this.formOrder.querySelector('.form__errors');

    // Начальное состояние кнопки
    this.buttonSubmit.disabled = true;

    this.buttonAll.forEach((button) => {
      button.addEventListener('click', () => {
        this.paymentSelect = button.name;
        this.currentPayment = button.name;
        this.updateSubmitButton();
        this.toggleErrors(this.currentAddress, this.currentPayment);
        events.emit('order:paymentSelect', button);
      });
    });

    this.formOrder.addEventListener('input', (e) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      if (target.name === 'address') {
        this.currentAddress = target.value;
        this.updateSubmitButton();
        this.toggleErrors(this.currentAddress, this.currentPayment);
      }
      this.events.emit('order:changeInputAddress', { 
        inputName: target.name, 
        inputValue: target.value 
      });
    });

    this.formOrder.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateInputs(this.currentAddress, this.currentPayment)) {
        this.events.emit('formContact:open');
      }
    });
  }

  private updateSubmitButton() {
    const isFormValid = this.validateInputs(this.currentAddress, this.currentPayment);
    this.buttonSubmit.disabled = !isFormValid;
  }

  set paymentSelect(paymentMethod: string) {
    this.buttonAll.forEach(button => {
      button.classList.toggle('button_alt-active', button.name === paymentMethod);
    });
  }

  toggleErrors(address: string, payment: string): void {
    // Проверяем, что значения не undefined/пустые
    const hasAddressError = !address?.trim();
    const hasPaymentError = !payment?.trim();

    if (hasAddressError) {
      this.formErrors.textContent = 'Заполните адрес';
    } else if (hasPaymentError) {
      this.formErrors.textContent = 'Выберите способ оплаты';
    } else {
      this.formErrors.textContent = '';
    }
  }

  validateInputs(address: string, payment: string): boolean {
    return !!address.trim() && !!payment.trim();
  }

  render(): HTMLElement {
    return this.formOrder;
  }
}