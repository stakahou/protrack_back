import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const { req } = GqlExecutionContext.create(context).getContext();
    return data ? req?.user[data] : req?.user;
  },
);
