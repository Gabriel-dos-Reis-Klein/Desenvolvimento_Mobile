import BaseService from "../api/base.service";
import { ENDPOINTS } from "../api/endpoints"

// TODO: Adicionar métodos exclusivos da classe conforme avanço no desenvolvimento do backend
class CustomerService extends BaseService{
    constructor(){
        super(ENDPOINTS.CUSTOMERS);
    }
}

export default new CustomerService();