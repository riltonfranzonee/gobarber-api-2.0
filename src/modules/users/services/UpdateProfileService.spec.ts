import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'nome atualizado',
      email: 'updated@email.com',
    });

    expect(updatedUser.name).toBe('nome atualizado');
    expect(updatedUser.email).toBe('updated@email.com');
  });

  it('should not be able to update an unexistent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: '100',
        name: 'nome atualizado',
        email: 'updated@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the an email that is already being used', async () => {
    await fakeUserRepository.create({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'jonatas',
      email: 'jonatas@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'nome atualizado',
        email: 'rilton@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'nome atualizado',
      email: 'rilton@email.com',
      old_password: '123456',
      password: '1234567',
    });

    expect(updatedUser.password).toBe('1234567');
  });

  it('should be not be able to update the password without the old one', async () => {
    const user = await fakeUserRepository.create({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'nome atualizado',
        email: 'rilton@email.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'nome atualizado',
        email: 'rilton@email.com',
        password: '1234567',
        old_password: '21331231',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
