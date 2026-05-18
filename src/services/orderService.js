import BaseService from "./BaseService";

// TODO: Adicionar métodos exclusivos da classe conforme avanço no desenvolvimento do backend
class OrderService extends BaseService{
    constructor(){
        super('/pedidos');
    }
}

export default new OrderService();