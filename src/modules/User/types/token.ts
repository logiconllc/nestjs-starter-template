import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenType {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  jwt?: string;
}
