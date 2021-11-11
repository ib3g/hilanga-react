import { User } from '../entities/users/user.entity';
import { UserDto } from '../entities/users/dto/user.dto';
import { UpdateUserDto } from '../entities/users/dto/update-user.dto';

export const toUserDto = (data: User): UserDto => {
  const {
    id,
    slug,
    firstName,
    lastName,
    role,
    phone,
    email,
    manager,
    birthDay,
  } = data;
  return {
    id,
    slug,
    firstName,
    lastName,
    role,
    phone,
    email,
    manager,
    birthDay,
  };
};

export const toUserUpdateDto = (data: User): UpdateUserDto => {
  const { firstName, lastName, birthDay, email, slug, phone } = data;
  return {
    firstName,
    lastName,
    birthDay,
    email,
    slug,
    phone,
  };
};
