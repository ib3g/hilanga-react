import { User } from './entities/users/user.entity';
import { UserDto } from './entities/users/dto/user.dto';

export const toUserDto = (data: User): UserDto => {
  const { id, firstName, lastName, role, phone, email } = data;
  return { id, firstName, lastName, role, phone, email };
};
