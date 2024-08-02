import { BadRequestException, Logger, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { isNotEmptyObject } from 'class-validator';

export default class NotEmptyObjectPipe implements PipeTransform<object> {
  transform(value: object, metadata: ArgumentMetadata): object {
    if (typeof value === 'object' && isNotEmptyObject(value)) {
      return value;
    }

    Logger.debug(`Object (${metadata.type}) is empty`, NotEmptyObjectPipe.name);
    throw new BadRequestException(`Object (${metadata.type}) should not be empty`);
  }
}
