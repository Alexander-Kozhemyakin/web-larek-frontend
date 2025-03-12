import { Card } from "./Card";
import { IEvents } from "../base/events";
import { IActions, IProductItem, ICard } from "../../types/index";
import { BasketModel } from "../model/BasketModel";

export class CardPreview extends Card implements ICard {
  text: HTMLElement;
  button: HTMLElement;
  private currentData: IProductItem;

  constructor(template: HTMLTemplateElement, protected events: IEvents, protected basketModel: BasketModel, actions?: IActions) {
    super(template, events, actions);
    this.text = this._cardElement.querySelector('.card__text');
    this.button = this._cardElement.querySelector('.card__button');
    this.button.addEventListener('click', () => {
      if(this.basketModel.checkProductInBasket(this.currentData)) {
        this.events.emit('basket:basketItemRemove', this.currentData); 
      } else {
        this.events.emit('card:addBasket', this.currentData);
      }
    });
  }

  categoryColor(value: string): string {
    switch (value.toLowerCase()) { // Добавляем нормализацию регистра
      case 'софт-скил':
        return 'soft';
      case 'хард-скил':
        return 'hard';
      case 'кнопка':
        return 'button';
      case 'дополнительное':
        return 'additional';
      case 'другое': // Явно указываем дефолтный случай
        return 'other';
      default:
        return 'other'; // Все неизвестные категории попадут сюда
    }
  }

  updateButtonState(data: IProductItem) {
    if (this.basketModel.checkProductInBasket(data)) {
      this.button.textContent = 'Удалить из корзины';
      this.button.removeAttribute('disabled');
    } else if (data.price) {
      this.button.textContent = 'Добавить в корзину';
      this.button.removeAttribute('disabled');
    } else {
      this.button.textContent = 'Бесценно';
      this.button.setAttribute('disabled', 'true');
    }
  }

  render(data: IProductItem): HTMLElement {
    this._cardCategory.textContent = data.category;
    this._cardCategory.className = `card__category card__category_${this.categoryColor(data.category)}`; 
    this._cardTitle.textContent = data.title;
    this._cardImage.src = data.image;
    this._cardImage.alt = this._cardTitle.textContent;
    this.text.textContent = data.description;
    if (data.price === null) {
      this._cardPrice.textContent = 'Бесценно';
    } else {
      this._cardPrice.textContent = `${String(data.price)} синапсов`;
    }
    this.updateButtonState(data);
    this.currentData = data;
    return this._cardElement;
  }
}