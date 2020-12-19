import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'rilton',
      email: 'rilton@email.com',
      password: '123456',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('rilton');
    expect(profile.email).toBe('rilton@email.com');
  });

  it('should not be able to show the profile for an unexistent user', async () => {
    await expect(
      showProfile.execute({ user_id: '100' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
