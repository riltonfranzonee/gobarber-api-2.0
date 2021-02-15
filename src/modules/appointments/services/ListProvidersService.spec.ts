// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@email.com',
      password: '123456',
    });

    const currentUser = await fakeUserRepository.create({
      name: 'current',
      email: 'current@email.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: currentUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
