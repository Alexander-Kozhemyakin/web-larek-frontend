import { IActions, IProductItem } from '../../types';
import { IEvents } from '../base/events';
import { IBasketItem } from '../../types';

export class BasketItem implements IBasketItem {
  basketItem: HTMLElement;
  index: HTMLElement;
  title: HTMLElement;
  price: HTMLElement;
  buttonDelete: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.basketItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
    this.index = this.basketItem.querySelector('.basket__item-index');
    this.title = this.basketItem.querySelector('.card__title');
    this.price = this.basketItem.querySelector('.card__price');
    this.buttonDelete = this.basketItem.querySelector('.basket__item-delete');

    if (actions?.onClick) {
      this.buttonDelete.addEventListener('click', actions.onClick);
    }
  }

  render(data: IProductItem, item: number): HTMLElement {
      this.index.textContent = String(item);
      this.title.textContent = data.title;
      if (data.price === null) {
        this.price.textContent = 'Бесценно';
      } else {
        this.price.textContent = `${String(data.price)} синапсов`;
      }
      return this.basketItem;
  }
}