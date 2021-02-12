import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Auth')
export class AuthType {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  picture: string;

  @Field()
  role: string;

  @Field()
  active: boolean;

  @Field()
  token: string;
}
