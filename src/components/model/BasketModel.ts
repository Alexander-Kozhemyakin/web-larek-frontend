import { IBasketModel, IProductItem } from "../../types";

export class BasketModel implements IBasketModel {
    protected _basketProducts: IProductItem[];

    constructor() {
        this._basketProducts = [];
    }

    set basketProducts(data: IProductItem[]) {
        this._basketProducts = data;
    }

    get basketProducts() {
        return this._basketProducts;
    }

    getCounter() {
        return this.basketProducts.length;
    }

    getSum() {
        return this.basketProducts.reduce((acc, item) => acc + item.price, 0);
    }

    pushItemCard(item: IProductItem) {
        this._basketProducts.push(item);
    }

    deleteItemCard(item: IProductItem) {
        this._basketProducts = this._basketProducts.filter((card) => card.id !== item.id);
    }

    checkProductInBasket(item: IProductItem) {
        return this._basketProducts.find((card) => card.id === item.id);
    }

    clearBasket() {
        this._basketProducts = [];
    }

}