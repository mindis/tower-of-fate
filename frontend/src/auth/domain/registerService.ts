import { confirmUser, createUser, UserDTO } from '../data/registerClient';

export interface User {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
}

function toOptional(name: string): string | undefined {
  if (name === '') {
    return undefined;
  }
  return name;
}

function toUser(dto: UserDTO): User {
  return {
    email: dto.email,
    password: dto.password,
    name: dto.name || '',
    isVerified: dto.isVerified,
  };
}

export function register(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const toBeCreatedUser: UserDTO = {
    email,
    password,
    name: toOptional(name),
    isVerified: false,
  };
  return createUser(toBeCreatedUser).then(toUser);
}

export function confirm(id: string): Promise<User> {
  return confirmUser({ id }).then(toUser);
}
