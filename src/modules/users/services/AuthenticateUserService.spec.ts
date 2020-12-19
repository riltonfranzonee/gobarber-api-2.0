import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to authenticate and return a token', async () => {
    const user = await createUser.execute({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    const auth = await authenticateUser.execute({
      email: 'rilton@email.com',
      password: '123456',
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should not be able to authenticate an unexistent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'rilton@email.com',
        password: '112123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'rilton@email.com',
        password: '112123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
