import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover password from email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'rilton',
      email: 'riltonfranzone@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'riltonfranzone@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover password for an unexistent user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'riltonfranzone@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'rilton',
      email: 'riltonfranzone@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'riltonfranzone@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
