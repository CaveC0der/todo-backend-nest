import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { AppConfigService } from '../app-config';
import { FilesService } from '../files';
import { Prisma } from '@prisma/client';
import { UserUpdateDto } from './dtos';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly passwordSalt;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: AppConfigService,
    private readonly filesService: FilesService,
  ) {
    this.passwordSalt = this.config.getEnv('PASSWORD_SALT');
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async getWithTokenOrThrow(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUniqueOrThrow({ where, include: { token: true } });
  }

  async getOrThrow(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUniqueOrThrow({ where });
  }

  async update(id: string, dto: UserUpdateDto) {
    dto.password = dto.password ? await hash(dto.password, this.passwordSalt) : undefined;

    return this.prisma.user.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async setAvatar(id: string, file: Express.Multer.File) {
    const user = await this.getOrThrow({ id });

    if (user.avatar) {
      await this.filesService.delete(user.avatar);
    }

    const avatar = await this.filesService.save(file);

    await this.prisma.user.update({ where: { id }, data: { avatar } });

    return { avatar };
  }

  async deleteAvatar(id: string) {
    const user = await this.getOrThrow({ id });

    if (user.avatar) {
      await this.filesService.delete(user.avatar);
    }
  }
}
