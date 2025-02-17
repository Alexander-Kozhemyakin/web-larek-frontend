import { IEvents } from "../base/events";

 export interface IFormModel {
    items: string[];
    paymentSelect: string;
    email: string;
    phone: string;
    address: string;
    totalSum: number;
 }

export class FormModel {
    items: string[] = [];
    paymentSelect: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';
    totalSum: number = 0;
    constructor(protected events: IEvents) {
        this.items = [];
        this.paymentSelect = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.totalSum = 0;
    }

    getInputAddress(inputName: string, inputValue: string) {
        if(inputName === 'address') {
            this.address = inputValue;
        }
    }
}