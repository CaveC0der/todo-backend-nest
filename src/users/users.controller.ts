import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { getParseFilePipe, instance } from '../common/utils';
import { UserDto, UserUpdateDto } from './dtos';
import { AccessGuard } from '../auth/guards';
import { User } from '../auth/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { IMG_FILE_TYPE_REGEXP, MAX_FILE_SIZE } from '../common/constants';
import { NotEmptyObjectPipe } from '../common/pipes';

@UseGuards(AccessGuard)
@Controller('users/me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get(@User('id') id: string) {
    return instance(UserDto, await this.usersService.getOrThrow({ id }));
  }

  @Patch()
  async update(@User('id') id: string, @Body(NotEmptyObjectPipe) dto: UserUpdateDto) {
    return instance(UserDto, await this.usersService.update(id, dto));
  }

  @Delete()
  async delete(@User('id') id: string) {
    await this.usersService.delete(id);
  }

  @UseInterceptors(FileInterceptor('img'))
  @Post('avatar')
  async setAvatar(
    @User('id') id: string,
    @UploadedFile(getParseFilePipe(IMG_FILE_TYPE_REGEXP, MAX_FILE_SIZE))
    file: Express.Multer.File,
  ) {
    return this.usersService.setAvatar(id, file);
  }

  @Delete('avatar')
  async deleteAvatar(@User('id') id: string) {
    await this.usersService.deleteAvatar(id);
  }
}
