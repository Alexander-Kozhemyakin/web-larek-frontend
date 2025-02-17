import { ICard, IActions, IProductItem } from "../../types/index";
import { IEvents } from "../base/events";

export class Card implements ICard {
  protected _cardElement: HTMLElement;
  protected _cardCategory: HTMLElement;
  protected _cardTitle: HTMLElement;
  protected _cardImage: HTMLImageElement;
  protected _cardPrice: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this._cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this._cardCategory = this._cardElement.querySelector('.card__category') as HTMLElement;
    this._cardTitle = this._cardElement.querySelector('.card__title') as HTMLElement;
    this._cardImage = this._cardElement.querySelector('.card__image') as HTMLImageElement;
    this._cardPrice = this._cardElement.querySelector('.card__price') as HTMLElement;
    this._cardElement.querySelector('.card__button') as HTMLElement;

    if (actions?.onClick) {
      this._cardElement.addEventListener('click', actions.onClick);
    }  
  }

  categoryColor(value: string): string {
    switch (value) {
        case 'софт-скил':
            return 'soft';
        case 'хард-скил':
            return 'hard';
        case 'кнопка':
            return 'button';
        case 'дополнительное':
            return 'additional';
        default :  // категория 'другое'
            return 'other'
          }
  }

  render(data: IProductItem): HTMLElement {
    this._cardCategory.classList.add(`card__category_${this.categoryColor(data.category)}`);
    this._cardCategory.textContent = data.category;
    this._cardTitle.textContent = data.title;
    this._cardImage.src = data.image;
    this._cardImage.alt = this._cardTitle.textContent;

    if (data.price === null) {
      this._cardPrice.textContent = 'Бесценно';
    } else {
      this._cardPrice.textContent = `${String(data.price)} синапсов`;
    }
    return this._cardElement;
  }
}