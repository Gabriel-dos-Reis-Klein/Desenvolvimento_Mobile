import BaseService from "../api/base.service";
import { ENDPOINTS } from "../api/endpoints"

// TODO: Adicionar métodos exclusivos da classe conforme avanço no desenvolvimento do backend
class OrderService extends BaseService{
    constructor(){
        super(ENDPOINTS.ORDERS);
    }
}

export default new OrderService();