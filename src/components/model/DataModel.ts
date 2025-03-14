import { IDataModel, IProductItem } from "../../types";
import { IEvents } from "../base/events";

export class DataModel implements IDataModel {
    _productCards: IProductItem[];
    selectedCard: IProductItem;

    constructor(protected events: IEvents) {
        this._productCards = [];
    }

    set productCards(data: IProductItem[]) {
        this._productCards = data;
        this.events.emit('productCards:receive');
    }

    get productCards() {
        return this._productCards;
    }

    setPreview(item: IProductItem) {
        this.selectedCard = item;
        this.events.emit('modalCard:open', item);
    }
}