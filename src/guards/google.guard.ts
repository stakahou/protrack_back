import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

const ErrorEnum = {
  INVALID: 'Invalid OAuth access',
  EXPIRED: 'Session has expired',
};

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { access_token } = ctx.getArgs();
    req.query = { access_token };
    return req;
  }

  handleRequest(err, user, info, context, status) {
    if (err?.name === 'InternalOAuthError') {
      const {
        oauthError: { statusCode, data },
      } = err;

      const {
        error: { message, type },
      } = JSON.parse(data);

      Logger.error(message);

      switch (true) {
        case message.includes(ErrorEnum.INVALID):
          throw new UnauthorizedException(message);

        case message.includes(ErrorEnum.EXPIRED):
          throw new BadRequestException(message);

        default:
          throw err;
      }
    }

    if (err || !user) throw err || new UnauthorizedException();

    return user;
  }
}
