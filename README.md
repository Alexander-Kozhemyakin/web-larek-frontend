# Проектная работа "Веб-ларек"

Интернет-магазин с товарами для веб-разработчиков.
Функционал:

- просмотр каталога товаров
- добавление товаров в корзину
- реализация заказа

## Описание архитектуры проекта

В проекте применен один из паттернов проектирования архитектуры - MVC (Model View Controller), он обеспечивает четкое разделение логики представления и логики приложения.

Model - загрузка данных по API, логика работы приложения.

View - отображание интерфейса для взаимодействия с пользователем, прослушивает события произошедшие на странице.

Controller - в роли контроллера выступает тонкая прослойка EventEmitter - связывает View и Model посредством реагирования на события.

## Стек:

HTML, SCSS, TS, Webpack

## Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

## Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Описание базовых классов

### Класс Api

Методы:

- handleResponse(response: Response): Promise<object> - обработчик ответа сервера.
- get(uri: string) - принимает изменяющеюся часть url-адреса, возвращает ответ от сервера.
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - принимает изменяющеюся часть url-адреса, принимает данные в виде объекта для отправки на сервер, type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'.

### Класс EventEmitter - брокер событий (implements от IEvents и имеет следующие методы).

Класс EventEmitter реализует паттерн «Observer/Наблюдатель» и обеспечивает работу событий, его методы позволяют устанавливать и снимать слушатели событий, вызвать слушатели при возникновении события.

Методы:

- on - для подписки на событие.
- off - для отписки от события.
- emit - уведомления подписчиков о наступлении события соответственно.
- onAll - для подписки на все события.
- offAll - сброса всех подписчиков.
- trigger - генерирует заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter.

## Описание классов Model, которые позволяют хранить и обрабатывать данные с сервера и от пользователей.

# Корзина (IBasketModel)

interface IBasketModel {
  basketProducts: IProductItem[];  // Товары в корзине
  getCounter(): number;            // Количество товаров
  getSum(): number;                // Сумма заказа
  pushItemCard(item: IProductItem): void;  // Добавить товар
  deleteItemCard(item: IProductItem): void;// Удалить товар
  checkProductInBasket(item: IProductItem): IProductItem | undefined;
}

# Модель данных (IDataModel)

interface IDataModel {
  productCards: IProductItem[];  // Все доступные товары
  selectedCard: IProductItem;    // Выбранный товар (превью)
  setPreview(item: IProductItem): void; // Выбор товара
}

# Модель формы (IFormModel)

interface IFormModel {
  items: string[];       // ID выбранных товаров
  paymentSelect: string; // Выбранный способ оплаты
  email: string;         // Введенный email
  phone: string;         // Введенный телефон
  address: string;       // Введенный адрес
  totalSum: number;      // Итоговая сумма
  formErrors: IFormErrors; // Ошибки валидации
  
  // Методы валидации:
  validateAddressAndPayment(): boolean;
  validateEmailAndPhone(): void;
}

## UI-Компоненты

# Корзина (IBasket)

interface IBasket {
  basket: HTMLElement;         // Контейнер корзины
  basketList: HTMLElement;     // Список товаров
  basketPrice: HTMLElement;    // Блок с суммой
  headerBasketCounter: HTMLElement; // Счетчик в хедере
  counterBasket(value: number): void; // Обновить счетчик
  renderAllPrice(price: number): void; // Обновить сумму
}

# Карточка товара (ICard)

interface ICard {
  render(data: IProductItem): HTMLElement; // Генерация HTML
  categoryColor(value: string): string;    // Цвет категории
}

# Ошибки формы (IFormErrors)

interface IFormErrors {
  email?: string;    // Ошибка валидации email
  phone?: string;    // Ошибка валидации телефона
  address?: string;  // Ошибка адреса
  payment?: string;  // Ошибка выбора оплаты
}

# Действия (IActions)

interface IActions {
  onClick(event: MouseEvent): void; // Обработчик кликов
}

### Класс ApiModel наследуется от класса Api, передаёт и получает данные от сервера.

Методы:

- getListProductCard - получаем массив объектов(карточек) с сервера.
- postOrderLot - получаем ответ от сервера по сделанному/отправленному заказу.

## Типы данных приложения

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

npm install
npm run start

или

yarn
yarn start

## Сборка

npm run build

или

yarn build
