import BaseService from "./BaseService";

// TODO: Adicionar métodos exclusivos da classe conforme avanço no desenvolvimento do backend
class CustomerService extends BaseService{
    constructor(){
        super('/clientes');
    }
}

export default new CustomerService();