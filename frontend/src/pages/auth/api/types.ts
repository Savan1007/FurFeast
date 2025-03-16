export interface AuthResponse {
  data: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  auth: boolean;
}

export interface Credentials {
  username: string;
  password: string;
}
