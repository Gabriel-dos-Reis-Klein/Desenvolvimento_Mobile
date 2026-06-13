import BaseService from "../api/base.service";
import { ENDPOINTS } from "../api/endpoints"

class CustomerService extends BaseService{
    constructor(){
        super(ENDPOINTS.CUSTOMERS);
    }
}

export default new CustomerService();