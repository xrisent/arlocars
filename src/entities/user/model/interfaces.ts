/** Доменная модель пользователя (как отдаётся из read-слоя) */
export type UserEntity = {
  id: number;
  email: string;
  isAdmin: boolean;
  password: string;
  createdAt: Date;
};
