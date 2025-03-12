import { IProductItem, OrderData } from "../../types/index";
import { Api, ApiListResponse } from "../base/api";

interface OrderResponse {
    id: string;
    total: number;
    error?: string;
}

interface ApiErrorResponse {
    error: string;
    statusCode: number;
}

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

    async sendOrder(orderData: OrderData): Promise<OrderResponse> {
        const response = await fetch(`${this.baseUrl}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw {
                status: response.status,
                message: data.error || 'Ошибка сервера'
            };
        }

        return data as OrderResponse;
    }
}