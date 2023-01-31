import axios from "axios";
import { IUser } from "../types/user.type";

class UserService {
  baseUrl = process.env.REACT_APP_BASE_URL;

  public async getUsers(portia: number) {
    try {
      const response = await axios.get<IUser[]>(
        `${this.baseUrl}/users?_page=${portia}&_limit=10`
      );
      return response.data;
    } catch (e) {
      return [];
    }
  }

  public async createUser(user: IUser) {
    try {
      const response = await axios.post(`${this.baseUrl}/users`, user);
      return response.data;
    } catch (e) {
      return null;
    }
  }
}

export const userService = new UserService();
