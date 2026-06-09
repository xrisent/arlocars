export interface UserEntity {
  id: number;
  email: string;
  isAdmin: boolean;
  password: string;
  createdAt: Date;
}
