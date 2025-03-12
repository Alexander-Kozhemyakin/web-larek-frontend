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
import { ContactForm } from './components/view/ContactForm';
import { Success } from './components/view/Success';
import { Page } from './components/view/Page';

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const basketItemTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const page = new Page(document.querySelector('.page__wrapper') as HTMLTemplateElement, events);
const dataModel = new DataModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const basketModel = new BasketModel();
const orderForm = new OrderForm(orderTemplate, events);
const formModel = new FormModel(events);
const contactForm = new ContactForm(contactTemplate, events);
const successForm = new Success(successTemplate, events);

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
    // basket.counterBasket(basketModel.getCounter());
    page.counterBasket(basketModel.getCounter());
    const cardPreview = new CardPreview(cardPreviewTemplate, events, basketModel);
    cardPreview.updateButtonState(dataModel.selectedCard);
    modal.close();
});

events.on('basket:open', () => {
    basket.renderAllPrice(basketModel.getSum());
    basket.items = basketModel.basketProducts.map((item, index) => {
       const basketItem = new BasketItem(basketItemTemplate, events, {onClick: () => events.emit('basket:basketItemRemove', item)});
       index += 1;
       return basketItem.render(item, index);
    });
    if(Array.isArray(basketModel.basketProducts) && basketModel.basketProducts.length == 0) 
        {basket.button.disabled = true;}
    else {
        basket.button.disabled = false;
    }
    modal.content = basket.render();
    modal.render();
});

events.on('basket:basketItemRemove', (item: IProductItem) => {
    basketModel.deleteItemCard(item);
    // basket.counterBasket(basketModel.getCounter());
    page.counterBasket(basketModel.getCounter());
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

events.on('order:paymentSelect', (button: HTMLButtonElement) => {
    formModel.paymentSelect = button.name;
});

events.on('order:changeInputAddress', (data : { inputName:string, inputValue:string }) => {
    formModel.getInputAddress(data.inputName, data.inputValue);
});

events.on<{ type: string; value: string }>('contact:change', (data) => {
    switch (data.type) {
        case 'email':
            formModel.email = data.value;
            break;
        case 'phone':
            formModel.phone = data.value;
            break;
    }
});

events.on('formContact:open', () => {
    if(formModel.validateAddressAndPayment()) {
        modal.content = contactForm.render();
        modal.render();
    }
});

events.on('formErrors:addressAndPayment', ( errors: { address: string, payment: string }) => {
    orderForm.toggleErrors(errors.address, errors.payment);
});

events.on('formErrors:emailAndPhone', ( errors: { email: string, phone: string }) => {
    contactForm.toggleErrors();
});

events.on('contact:submit', async () => {
    try {
        if (!formModel.validateAddressAndPayment() || !formModel.validateEmailAndPhone()) {
            throw new Error('Исправьте ошибки в форме');
        }

        if (basketModel.getCounter() === 0) {
            throw new Error('Корзина пуста');
        }

        const total = basketModel.getSum();

        const orderData = {
            payment: formModel.paymentSelect,
            email: formModel.email,
            phone: formModel.phone,
            address: formModel.address,
            total: basketModel.getSum(),
            items: basketModel.basketProducts.map(item => item.id)
        };

        // 4. Правильный вызов API
        const result = await apiModel.sendOrder(orderData);
        
        // 5. Обновление интерфейса
        basketModel.clearBasket();
        formModel.reset();
        page.counterBasket(0);
        
        // 6. Предполагаем, что successForm и errorForm объявлены
        successForm.price = total;
        modal.content = successForm.render();
        modal.open();

    } catch (error) {
        console.error('Ошибка заказа:', error);
        
        // 7. Обработка разных типов ошибок
        const message = error instanceof Error 
            ? error.message 
            : (error as { message?: string }).message || 'Неизвестная ошибка';
    }
});

events.on('success:close', () => {
    modal.close();
})


apiModel.getListProductsCards()
    .then((data) => {dataModel.productCards = data;})
    .catch ((error) => console.error(error));