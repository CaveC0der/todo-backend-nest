import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppConfigService } from '../app-config';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v4 } from 'uuid';
import { extension } from 'mime-types';
import { unlink, writeFile } from 'fs/promises';

@Injectable()
export class FilesService {
  private readonly serveStaticPath: string;

  constructor(private readonly config: AppConfigService) {
    this.serveStaticPath = this.config.serveStaticPath;

    if (!existsSync(this.serveStaticPath)) {
      mkdirSync(this.serveStaticPath);
    }
  }

  async save(file: Express.Multer.File) {
    const filename = `${v4()}.${extension(file.mimetype)}`;

    try {
      await writeFile(join(this.serveStaticPath, filename), file.buffer);
      return filename;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async delete(filename: string) {
    try {
      await unlink(join(this.serveStaticPath, filename));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
