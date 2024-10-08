export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createAt: number;
  updateAt: number | null;
  status: Date | null;
}
