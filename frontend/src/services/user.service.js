import axios from "axios";
import authHeader from './auth-header';

const API_URL = process.env || "http://localhost:3001/api/";

class UserService {
    getProfile() {
        return axios.get(API_URL + 'profile', { headers: authHeader() });
      }
   
}

export default new UserService();