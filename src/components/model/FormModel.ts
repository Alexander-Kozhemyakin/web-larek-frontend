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

    validateAddressAndPayment() {
        if(this.address === '') {
            this.formErrors.address = 'Введите адрес';
        } else {
            delete this.formErrors['address'];
        }

        if(this.paymentSelect === '') {
            this.formErrors.payment = 'Выберите способ оплаты';
        } else {
            delete this.formErrors['payment'];
        }

        if(Object.keys(this.formErrors).length === 0) {
            this.events.emit('formErrors:addressAndPayment', this.formErrors);
            return true;
        } else {
            this.events.emit('formErrors:addressAndPayment', this.formErrors);
        }
    }

    validateEmailAndPhone() {
        if(this.email === '') {
            this.formErrors.email = 'Введите email';
        } else {
            delete this.formErrors['email'];
        }

        if(this.phone === '') {
            this.formErrors.phone = 'Введите телефон';
        } else {
            delete this.formErrors['phone'];
        }

        if(Object.keys(this.formErrors).length === 0) {
            this.events.emit('formErrors:emailAndPhone', this.formErrors);
            return true;
        } else {
            this.events.emit('formErrors:emailAndPhone', this.formErrors);
        }
    }

    reset() {
        this.address = '';
        this.paymentSelect = '';
        this.email = '';
        this.phone = '';
        this.formErrors = {};
    }
}