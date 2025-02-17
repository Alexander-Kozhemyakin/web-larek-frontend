import './scss/styles.scss';
import { ensureElement } from './utils/utils';
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/model/ApiModel';
import { DataModel } from './components/model/DataModel';
import { Card } from './components/view/Card';
import { IProductItem } from './types';
import { CardPreview } from './components/view/CardPreview';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { BasketModel } from './components/model/BasketModel';
import { BasketItem } from './components/view/BasketItem';
import { OrderForm } from './components/view/OrderForm';
import { FormModel } from './components/model/FormModel';

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const basketItemTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new DataModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const basketModel = new BasketModel();
const orderForm = new OrderForm(orderTemplate, events);
const formModel = new FormModel(events);

events.on('productCards:receive', () => {
    dataModel.productCards.forEach((item) => {
        const card = new Card(cardCatalogTemplate, events, {onClick: () => events.emit('card:select', item)});
        ensureElement<HTMLElement>(".gallery").append(card.render(item))    
    });
});

events.on('card:select', (item: IProductItem) => {
    dataModel.setPreview(item);
});

events.on('modalCard:open', (item: IProductItem) => {
    const cardPreview = new CardPreview(cardPreviewTemplate, events, basketModel);
    modal.content = cardPreview.render(item);
    modal.render();
});

events.on('modal:open', () => modal.locked = true);

events.on('modal:close', () => modal.locked = false);

events.on('card:addBasket', () => {
    basketModel.pushItemCard(dataModel.selectedCard);
    basket.counterBasket(basketModel.getCounter());
    const cardPreview = new CardPreview(cardPreviewTemplate, events, basketModel);
    // cardPreview.buttonChange();  // изменяем кнопку "Удалить" на "Добавить в корзину"
    cardPreview.updateButtonState(dataModel.selectedCard);
    // modal.content = cardPreview.render(dataModel.selectedCard);
    // modal.render();
    modal.close();
});

events.on('basket:open', () => {
    basket.renderAllPrice(basketModel.getSum());
    basket.items = basketModel.basketProducts.map((item, index) => {
       const basketItem = new BasketItem(basketItemTemplate, events, {onClick: () => events.emit('basket:basketItemRemove', item)});
       index += 1;
       return basketItem.render(item, index);
    });
    modal.content = basket.render();
    modal.render();
});

events.on('basket:basketItemRemove', (item: IProductItem) => {
    basketModel.deleteItemCard(item);
    basket.counterBasket(basketModel.getCounter());
    basket.renderAllPrice(basketModel.getSum());
    basket.items = basketModel.basketProducts.map((item, index) => {
        const basketItem = new BasketItem(basketItemTemplate, events, {onClick: () => events.emit('basket:basketItemRemove', item)});
        index += 1;
        return basketItem.render(item, index);
    });
    const cardPreview = new CardPreview(cardPreviewTemplate, events, basketModel);
    cardPreview.updateButtonState(dataModel.selectedCard);
});

events.on('order:open', () => {
    modal.content = orderForm.render();
    modal.render();
    formModel.items = basketModel.basketProducts.map((item) => item.id);
});

// events.on('order:changeInputAddress', (data: { inputName, inputValue }) => {
//     formModel.getInputAddress(inputName, inputValue);
// })

apiModel.getListProductsCards()
    .then((data) => {dataModel.productCards = data;})
    .catch ((error) => console.error(error));