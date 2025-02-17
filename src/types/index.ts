// карточка товара
export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// список товаров
// export interface IProductList {
//     items: IProductItem[];
//     total: number;
// }

export interface ICard {
    render(data: IProductItem): HTMLElement;
    categoryColor(value: string): string;
}

export interface IActions {
    onClick(event: MouseEvent): void;
}

export interface IModal {
    open(): void;
    close(): void;
    render(): HTMLElement;
}

export interface IBasket {
    basket: HTMLElement;
    title: HTMLElement;
    basketList: HTMLElement;
    button: HTMLButtonElement;
    basketPrice: HTMLElement;
    headerBasketButton: HTMLButtonElement;
    headerBasketCounter: HTMLElement;
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

export interface IOrder {
    formOrder: HTMLFormElement;
    buttonAll: HTMLButtonElement[];
    paymentSelect: string;
    formErrors: HTMLElement;
    render(): HTMLElement;
  }