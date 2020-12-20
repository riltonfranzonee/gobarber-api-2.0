import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 } from 'uuid';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(u => u.id !== except_user_id);
    }

    return users;
  }
}
