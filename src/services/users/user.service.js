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
}

export default new UserService();