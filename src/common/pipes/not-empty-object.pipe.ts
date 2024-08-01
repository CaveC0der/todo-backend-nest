import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isNotEmptyObject } from 'class-validator';

export default class NotEmptyObjectPipe implements PipeTransform<object> {
  transform(value: object): object {
    if (typeof value === 'object' && isNotEmptyObject(value)) {
      return value;
    }

    throw new BadRequestException('object should not be empty');
  }
}
