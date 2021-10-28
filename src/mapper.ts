import { User } from './entities/users/user.entity';
import { UserDto } from './entities/users/dto/user.dto';

export const toUserDto = (data: User): UserDto => {
  const { id, slug, firstName, lastName, role, phone, email, manager } = data;
  return {
    id,
    slug,
    firstName,
    lastName,
    role,
    phone,
    email,
    manager,
  };
};
