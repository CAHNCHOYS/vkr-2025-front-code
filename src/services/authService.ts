import axios from '@/api';
import type { LoginResponse, SuccessResponse, VerifyUserResponse } from '@/types/responses';

class AuthService {
  async login(loginPayload: any) {
    console.log(loginPayload);
    const { data } = await axios.post<LoginResponse>('/auth/login', loginPayload);
    console.log(data);
    return data;
  }

  async register(registerPayload: any) {
    const { data } = await axios.post<SuccessResponse>('/auth/register', registerPayload);
    return data;
  }

  async verifyUser(token: string) {
    const { data } = await axios.get<VerifyUserResponse>('/auth/verify', {
      headers: {
        withCredentials: true,
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

export default new AuthService();
