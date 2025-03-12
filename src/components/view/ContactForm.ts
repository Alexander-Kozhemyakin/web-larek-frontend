import { IContactForm } from "../../types";
import { IEvents } from "../base/events";

export class ContactForm implements IContactForm {
  formContacts: HTMLFormElement;
  inputAll: HTMLInputElement[];
  buttonSubmit: HTMLButtonElement;
  formErrors: HTMLElement;
  private currentEmail: string = '';
  private currentPhone: string = '';

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.formContacts = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.inputAll = Array.from(this.formContacts.querySelectorAll('.form__input'));
    this.buttonSubmit = this.formContacts.querySelector('.button');
    this.formErrors = this.formContacts.querySelector('.form__errors');

    // Начальное состояние кнопки
    this.buttonSubmit.disabled = true;

    this.formContacts.addEventListener('input', (e) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      
      if (target.name === 'email') {
        this.currentEmail = target.value.trim();
      } else if (target.name === 'phone') {
        this.currentPhone = target.value.trim();
      }

      this.updateSubmitButton();
      
      this.toggleErrors();
      this.events.emit('contact:changeInput', { 
        inputName: target.name, 
        inputValue: target.value 
      });
    });

    this.formContacts.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.isFormValid()) {
        this.events.emit('contact:submit');
      }
    });

    this.formContacts.addEventListener('input', (e) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      
      if (target.name === 'email') {
          this.currentEmail = target.value.trim();
          // Передаем данные как объект
          this.events.emit('contact:change', { 
              type: 'email', 
              value: this.currentEmail 
          });
      } else if (target.name === 'phone') {
          this.currentPhone = target.value.trim();
          // Передаем данные как объект
          this.events.emit('contact:change', { 
              type: 'phone', 
              value: this.currentPhone 
          });
      }

      this.updateSubmitButton();
      this.toggleErrors();
    });
  }

  private isFormValid(): boolean {
    return this.validateEmail(this.currentEmail) && 
           this.validatePhone(this.currentPhone);
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private validatePhone(phone: string): boolean {
    return /^\+?\d{10,15}$/.test(phone);
  }

  private updateSubmitButton() {
    this.buttonSubmit.disabled = !this.isFormValid();
  }

  toggleErrors() {
    const emailValid = this.validateEmail(this.currentEmail);
    const phoneValid = this.validatePhone(this.currentPhone);

    if (!emailValid && !phoneValid) {
      this.formErrors.textContent = 'Заполните email и телефон';
    } else if (!emailValid) {
      this.formErrors.textContent = 'Введите корректный email';
    } else if (!phoneValid) {
      this.formErrors.textContent = 'Введите телефон в формате +XXXXXXXXXXX';
    } else {
      this.formErrors.textContent = '';
    }
  }

  render(): HTMLElement {
    return this.formContacts;
  }
}