// Типы данных API
export interface IProductCard {
    id: string; // Уникальный идентификатор товара
    title: string; // Название товара
    category: string; // Категория товара
    image: string; // URL изображения
    price: number; // Цена товара
}

export interface ICartItem {
    id: string; // ID товара
    title: string; // Название товара
    price: number; // Цена товара
    count: number; // Количество товара
}

export interface IOrderForm {
    paymentType: 'card' | 'cash'; // Тип оплаты
    address: string; // Адрес доставки
}

export interface IOrderResult {
    id: string; // ID заказа
    status: boolean; // Успех/ошибка
}

export interface IApiClient {
    fetchProducts(): Promise<IProductCard[]>; // Получить список товаров
    fetchProductById(id: string): Promise<IProductCard>; // Получить товар по ID
    createOrder(order: IOrderForm): Promise<IOrderResult>; // Создать заказ
}

// Модели данных
export interface IProductModel {
    getAllProducts(): Promise<IProductCard[]>; // Получение всех товаров
    getProductDetails(id: string): Promise<IProductCard>; // Детали товара
}

export interface ICartModel {
    addItemToCart(item: ICartItem): void; // Добавление товара в корзину
    removeItemFromCart(itemId: string): void; // Удаление товара из корзины
    getCartItems(): ICart; // Получение списка товаров в корзине
    clearCart(): void; // Очистка корзины
}

export interface ICart {
    items: ICartItem[]; // Список товаров в корзине
    totalPrice: number; // Общая стоимость товаров
}

// Интерфейсы отображений
export interface IHeader {
    logo: string; // URL логотипа
    cartCount: number; // Счётчик товаров в корзине
}

export interface IProductModal {
    id: string; // ID товара
    title: string; // Название товара
    category: string; // Категория товара
    image: string; // URL изображения
    description: string; // Описание товара
    price: number; // Цена товара
}

export interface IModalState {
    productModal: IProductModal | null; // Данные модального окна с карточкой товара
    cartModal: boolean; // Открыта ли корзина
    checkoutStep: 1 | 2 | 3 | null; // Шаг оформления заказа
}

export interface IProductCardComponent {
    render(product: IProductCard): HTMLElement; // Рендер карточки товара
    onClick(callback: (productId: string) => void): void; // Обработка клика
}

export interface ICartComponent {
    render(cart: ICart): HTMLElement; // Рендер корзины
    onRemoveItem(callback: (itemId: string) => void): void; // Удаление товара
    onCheckout(callback: () => void): void; // Оформление заказа
}

export interface IModalComponent {
    render(content: HTMLElement): HTMLElement; // Рендер модального окна
    onClose(callback: () => void): void; // Закрытие модального окна
}

// Базовые классы
export interface IBaseComponent {
    element: HTMLElement; // Корневой HTML-элемент
    render(): HTMLElement; // Метод рендеринга
    bindEvents(): void; // Привязка событий
}

// События и брокер событий
export type EventType =
    | 'product-clicked'
    | 'item-added-to-cart'
    | 'item-removed-from-cart'
    | 'checkout-initiated';

export interface IEvent {
    type: EventType; // Тип события
    payload?: any; // Данные события
}
