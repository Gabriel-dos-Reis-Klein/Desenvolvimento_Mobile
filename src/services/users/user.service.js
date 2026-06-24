import BaseService from "../api/base.service";
import { ENDPOINTS } from "../api/endpoints";

class UserService extends BaseService {
  constructor() {
    super(ENDPOINTS.USERS);
  }

  async login(data, config = {}) {
    const response = await this.api.post(
      `${this.endpoint}/login`,
      data,
      config
    );

    return response.data;
  }

  async passwordConfirm(data, config = {}){
    const response = await this.api.post(
      `${this.endpoint}/validar-senha`,
      data,
      config
    );
    return response.data;
  }

  async getMe(id, config = {}) {
    const response = await this.api.get(
      `${this.endpoint}/${id}`,
      config
    );
    return response.data;
  }

  async updateMe(data, config = {}) {
    const response = await this.api.patch(
      this.endpoint,
      data,
      config
    );
    return response.data;
  }

  async updatePassword(data, config = {}) {
    const response = await this.api.patch(
      `${this.endpoint}/atualizar/senha`,
      data,
      config
    );
    return response.data;
  }

  // Cadastra novo usuário (somente ADMIN)
  async register(data, config = {}) {
    const response = await this.api.post(
      this.endpoint,
      data,
      config
    );
    return response.data;
  }
}

export default new UserService();