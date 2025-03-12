import { IFormErrors, IFormModel } from "../../types";
import { IEvents } from "../base/events";

export class FormModel implements IFormModel {
    items: string[] = [];
    paymentSelect: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';
    totalSum: number = 0;
    formErrors: IFormErrors = {};
    constructor(protected events: IEvents) {
        this.items = [];
        this.paymentSelect = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.totalSum = 0;
        this.formErrors = {};
    }

    getInputAddress(inputName: string, inputValue: string) {
        if(inputName === 'address') {
            this.address = inputValue;
        }
    }

    getInputContact(inputName: string, inputValue: string) {
        if(inputName === 'email') {
            this.email = inputValue;
        } else if(inputName === 'phone') {
            this.phone = inputValue;
        }
    }

    validateAddressAndPayment(): boolean {
        this.formErrors = {};
        let isValid = true;
    
        if (!this.address.trim()) {
            this.formErrors.address = 'Введите адрес';
            isValid = false;
        }
    
        if (!this.paymentSelect) {
            this.formErrors.payment = 'Выберите способ оплаты';
            isValid = false;
        }
    
        this.events.emit('formErrors:change', this.formErrors);
        return isValid;
    }
    
    validateEmailAndPhone(): boolean {
        this.formErrors = {};
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{10,15}$/;
    
        if (!this.email.trim() || !emailRegex.test(this.email)) {
            this.formErrors.email = 'Введите корректный email';
            isValid = false;
        }
    
        if (!this.phone.trim() || !phoneRegex.test(this.phone)) {
            this.formErrors.phone = 'Введите телефон в формате +XXXXXXXXXXX';
            isValid = false;
        }
    
        this.events.emit('formErrors:change', this.formErrors);
        return isValid;
    }
    
    // Добавляем общий метод валидации
    validateAll(): boolean {
        return this.validateAddressAndPayment() 
            && this.validateEmailAndPhone();
    }

    setPayment(method: string) {
        this.paymentSelect = method;
        this.validateAddressAndPayment();
    }

    reset() {
        this.address = '';
        this.paymentSelect = '';
        this.email = '';
        this.phone = '';
        this.formErrors = {};
    }
}