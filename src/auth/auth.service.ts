import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokensService } from 'src/tokens';
import { UsersService } from 'src/users';
import { LoginDto, SignupDto } from './dtos';
import { compare, hash } from 'bcryptjs';
import { instance } from 'src/common/utils';
import { UserDto } from 'src/users/dtos';
import { AppConfigService } from '../app-config';

@Injectable()
export class AuthService {
  private readonly passwordSalt;
  private readonly tokenSalt;

  constructor(
    private readonly config: AppConfigService,
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {
    this.passwordSalt = this.config.getEnv('PASSWORD_SALT');
    this.tokenSalt = this.config.getEnv('TOKEN_SALT');
  }

  async signup({ username, email, password }: SignupDto) {
    const hashed = await hash(password, this.passwordSalt);
    const user = await this.usersService.create({ username, email, password: hashed });
    const tokens = await this.tokensService.sign({ id: user.id });
    await this.tokensService.create(await hash(tokens.refreshToken, this.tokenSalt), user.id);

    return { user: instance(UserDto, user), ...tokens };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.getWithTokenOrThrow({ email });

    if (!(await compare(password, user.password))) {
      throw new BadRequestException(['invalid password']);
    }

    const tokens = await this.tokensService.sign({ id: user.id });
    const hashedRefreshToken = await hash(tokens.refreshToken, this.tokenSalt);
    if (!user.token) {
      await this.tokensService.create(hashedRefreshToken, user.id);
    } else {
      await this.tokensService.update(hashedRefreshToken, user.id);
    }

    return { user: instance(UserDto, user), ...tokens };
  }

  async refresh(id: string, token: string) {
    const user = await this.usersService.getWithTokenOrThrow({ id });

    if (!user.token || !(await compare(token, user.token.value))) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokensService.sign({ id: user.id });
    await this.tokensService.update(await hash(tokens.refreshToken, this.tokenSalt), user.id);

    return { user: instance(UserDto, user), ...tokens };
  }

  async logout(id: string) {
    await this.tokensService.delete(id);
  }
}
