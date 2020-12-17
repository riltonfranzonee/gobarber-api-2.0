import { getRepository, Repository } from 'typeorm';

import IUsersTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class UsersTokensRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const token = this.ormRepository.create({ user_id });

    await this.ormRepository.save(token);

    return token;
  }
}
