import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../shared/interfaces';
import { CreateUserInput } from '../user/inputs/create-user.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(profile): Promise<any> {
    const user = await this.usersService.getBySocialId(profile.id);

    if (!user) {
      const {
        id: social_id,
        name: { givenName, familyName },
        _json,
      } = profile;

      const newUser: CreateUserInput = {
        social_id,
        first_name: givenName,
        last_name: familyName,
        picture: _json.picture,
        email: _json.email,
      };

      return this.usersService.create(newUser);
    }

    return user;
  }

  createToken(user: IUser) {
    const { id, social_id, ...rest } = user;

    return {
      ...rest,
      token: this.jwtService.sign({ id, role: rest.role, social_id }),
    };
  }
}
