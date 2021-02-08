import {
  applyDecorators,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';

export const Serializer = () =>
  applyDecorators(UseInterceptors(ClassSerializerInterceptor));
