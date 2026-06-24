import BaseService from "../api/base.service";
import { ENDPOINTS } from "../api/endpoints"

class OrderService extends BaseService{
    constructor(){
        super(ENDPOINTS.ORDERS);
    }

    async getByCustomer(id, config = {}){
        const response = await this.api.get(
            `${this.endpoint}/cliente/${id}`,
             config
        );
        return response.data;
    }
}

export default new OrderService();