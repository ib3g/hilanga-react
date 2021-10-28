import { User } from './users/user.entity';
import { UserDto } from './users/dto/user.dto';

export const toUserDto = (data: User): UserDto => {
  const { id, firstName, lastName, role, phone, email } = data;
  return { id, firstName, lastName, role, phone, email };
};
