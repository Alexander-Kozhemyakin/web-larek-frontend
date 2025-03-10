import { IContactForm } from "../../types";
import { IEvents } from "../base/events";

export class ContactForm implements IContactForm {
  formContacts: HTMLFormElement;
  inputAll: HTMLInputElement[];
  buttonSubmit: HTMLButtonElement;
  formErrors: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.formContacts = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.inputAll = Array.from(this.formContacts.querySelectorAll('.form__input'));
    this.buttonSubmit = this.formContacts.querySelector('.button');
    this.formErrors = this.formContacts.querySelector('.form__errors');

    this.formContacts.addEventListener('input', (e) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const inputName = target.name;
      const inputValue = target.value;
      this.events.emit('contact:changeInput', { inputName, inputValue });
    });

    this.formContacts.addEventListener('submit', (e) => {
      e.preventDefault();

      // Проверка валидации
      const email = this.inputAll.find(input => input.name === 'email')?.value;
      const phone = this.inputAll.find(input => input.name === 'phone')?.value;

      if (!email || !phone) {
        this.toggleErrors(email, phone);
        return;
      }

      this.events.emit('contact:submit');

      // Очистка формы
      // this.formContacts.reset();
      // this.formErrors.textContent = '';
    });
  }

  toggleErrors(email: string, phone: string) {
    if (!email) {
      this.formErrors.textContent = `Введите email`;
    } else if (!phone) {
      this.formErrors.textContent = `Введите телефон`;
    } else {
      this.formErrors.textContent = ``;
    }
  }

  render(): HTMLElement {
    return this.formContacts;
  }
}