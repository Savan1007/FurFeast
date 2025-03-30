export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface Credentials {
  emailOrUsername: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  roles: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  refreshToken: string;
}

export interface FetchUserResponse {
  success: boolean;
  data: User;
}
