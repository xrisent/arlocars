import type { UserEntity } from "@/entities/user/model/interfaces";

export type UserViewProps = {
  user: Pick<UserEntity, "id" | "email" | "isAdmin">;
};
