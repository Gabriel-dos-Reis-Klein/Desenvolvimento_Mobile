import api from "./api";

class BaseService{
    constructor(endpoint){
        this.endpoint = endpoint;
        this.api = api;
    }

    async getAll(config = {}){
        const response = await this.api.get(this.endpoint, config);
        return response.data;
    }

    async getById(id, config = {}){
        const response = await this.api.get(`${this.endpoint}/${id}`, config);
        return response.data;
    }

    async create(data, config = {}){
        const response = await this.api.post(this.endpoint, data, config);
        return response.data;
    }

    async update(id, data, config = {}){
        const response = await this.api.patch(`${this.endpoint}/${id}`, data, config);
        return response.data;
    }

    async remove(id, config = {}){
        const response = await this.api.delete(`${this.endpoint}/${id}`, config);
        return response.data;
    }
}

export default BaseService;