import { UserDto } from "@/types/UserDto";

export const parseUserData = (user: UserDto): UserDto => {
  return {
    ...user,
    id: Number(user.id),
  };
};
