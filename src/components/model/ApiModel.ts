import { IProductItem } from "../../types/index";
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
}