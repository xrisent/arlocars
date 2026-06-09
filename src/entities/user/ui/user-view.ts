import type { UserEntity } from "@/entities/user/model/interfaces";

export interface UserViewProps {
  user: Pick<UserEntity, "id" | "email" | "isAdmin">;
}
