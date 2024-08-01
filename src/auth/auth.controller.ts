import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dtos';
import { CookieOptions, Response } from 'express';
import { AccessGuard, RefreshGuard } from './guards';
import { User } from './decorators';
import { AppConfigService } from '../app-config';

@Controller('auth')
export class AuthController {
  private readonly cookieName;
  private readonly cookieMaxAge;
  private readonly cookieOptions: CookieOptions;

  constructor(
    private readonly authService: AuthService,
    private readonly config: AppConfigService,
  ) {
    this.cookieName = this.config.getEnv('COOKIE_NAME');
    this.cookieMaxAge = this.config.getEnv('COOKIE_MAX_AGE');
    this.cookieOptions = {
      maxAge: this.cookieMaxAge,
      httpOnly: true,
      sameSite: 'strict',
    };
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.signup(dto);

    res.cookie(this.cookieName, refreshToken, this.cookieOptions);

    return { user, accessToken };
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie(this.cookieName, refreshToken, this.cookieOptions);

    return { user, accessToken };
  }

  @UseGuards(RefreshGuard)
  @Patch('refresh')
  async refresh(@User() u: Express.User, @Res({ passthrough: true }) res: Response) {
    if (!u.refreshToken) {
      throw new InternalServerErrorException();
    }

    const { user, accessToken, refreshToken } = await this.authService.refresh(
      u.id,
      u.refreshToken,
    );

    res.cookie(this.cookieName, refreshToken, this.cookieOptions);

    return { user, accessToken };
  }

  @UseGuards(AccessGuard)
  @Delete('logout')
  async logout(@User('id') id: string, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(id);
    res.clearCookie(this.cookieName, this.cookieOptions);
  }
}
