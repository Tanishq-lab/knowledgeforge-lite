import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const AuthService = {
  async login(
    data: LoginRequest
  ): Promise<LoginResponse> {

    const formData = new URLSearchParams();

    formData.append(
      "username",
      data.email
    );

    formData.append(
      "password",
      data.password
    );

    const response = await api.post(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  },

  async register(
    data: RegisterRequest
  ) {

    const response = await api.post(
      "/auth/register",
      data
    );

    return response.data;
  },
};