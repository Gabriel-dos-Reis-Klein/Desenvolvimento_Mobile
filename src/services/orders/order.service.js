import BaseService from "../api/base.service";
import { ENDPOINTS } from "../api/endpoints"

class OrderService extends BaseService{
    constructor(){
        super(ENDPOINTS.ORDERS);
    }
}

export default new OrderService();