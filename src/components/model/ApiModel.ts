import { IProductItem, OrderData } from "../../types/index";
import { Api, ApiListResponse } from "../base/api";

export class ApiModel extends Api {
    cdn: string;
    items: IProductItem[];
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getListProductsCards():Promise<IProductItem[]> {
        return this.get(`/product`)
        .then((data: ApiListResponse<IProductItem>) => data.items.map((item: IProductItem) => ({
            ...item,
            image: this.cdn + item.image
        })));
    }

    async sendOrder(orderData: OrderData): Promise<Response> {
        return fetch(`${this.baseUrl}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
    }
}