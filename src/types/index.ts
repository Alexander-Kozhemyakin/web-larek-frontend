export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
// Пример интерфейса для данных заказа
export interface OrderData {
    items: string[];       // Массив id товаров в корзине
    total: number;         // Общая сумма заказа
    address: string;       // Адрес доставки
    payment: string;       // Способ оплаты (например, 'online' или 'cash')
    email: string;         // Email пользователя
    phone: string;         // Телефон пользователя
}

export interface IBasketModel {
    basketProducts: IProductItem[];
    getCounter(): number;
    getSum(): number;
    pushItemCard(item: IProductItem): void;
    deleteItemCard(item: IProductItem): void;
    checkProductInBasket(item: IProductItem): IProductItem | undefined;
    clearBasket(): void;
}

export interface IDataModel {
    productCards: IProductItem[];
    selectedCard: IProductItem;
    setPreview(item: IProductItem): void;
}

export interface IFormModel {
    items: string[];
    paymentSelect: string;
    email: string;
    phone: string;
    address: string;
    totalSum: number;
    formErrors: IFormErrors;
    getInputAddress(inputName: string, inputValue: string): void;
    validateAddressAndPayment(): void;
    validateEmailAndPhone(): void;
    getInputContact(inputName: string, inputValue: string): void;
    validateAddressAndPayment(): boolean;
}

export interface IBasket {
    basket: HTMLElement;
    title: HTMLElement;
    basketList: HTMLElement;
    button: HTMLButtonElement;
    basketPrice: HTMLElement;
    headerBasketButton: HTMLButtonElement;
    headerBasketCounter: HTMLElement;
    items: HTMLElement[];
    counterBasket(value: number): void;
    renderAllPrice(price: number): void;
    render(): HTMLElement;
}

export interface IBasketItem {
    basketItem: HTMLElement;
    index: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    buttonDelete: HTMLButtonElement;
    render(data: IProductItem, item: number): HTMLElement;
}

export interface ICard {
    render(data: IProductItem): HTMLElement;
    categoryColor(value: string): string;
}

export interface IContactForm {
    formContacts: HTMLFormElement;
    inputAll: HTMLInputElement[];
    buttonSubmit: HTMLButtonElement;
    formErrors: HTMLElement;
    toggleErrors(email: string, phone: string): void;
    render(): HTMLElement;
}

export interface IModal {
    open(): void;
    close(): void;
    render(): HTMLElement;
}

export interface IOrder {
    formOrder: HTMLFormElement;
    buttonAll: HTMLButtonElement[];
    paymentSelect: string;
    formErrors: HTMLElement;
    toggleErrors(address: string, payment: string): void;
    render(): HTMLElement;
}

export interface ISuccess {
    formSuccess: HTMLElement;
    totalSum: HTMLElement;
    buttonSuccess: HTMLButtonElement;
    render(): HTMLElement;
}

export interface IActions {
    onClick(event: MouseEvent): void;
}

export interface IFormErrors {
    email?: string;
    phone?: string;
    address?: string;
    payment?: string;
}