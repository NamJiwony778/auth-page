import axios from "axios";

const API_URL = process.env.NODE_ENV + "/"  || "http://localhost:3001/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(file, username, email, password) {
    let formData = new FormData();

    formData.append("currentImage", file);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    return axios.post(API_URL + "signup", formData,  {
      file,
      username,
      email,
      password
  },{ headers: {
    "Content-Type": "multipart/form-data",}
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();