import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user.entity';

@ObjectType()
export class ResponsePayload {
  @Field({ nullable: true })
  status: number;

  @Field({ nullable: true })
  message: string;

  @Field(() => User, { nullable: true }) // Update the type to User
  data?: User | null;
}

@ObjectType()
export class ResponsePayloadBool {
  @Field({ nullable: true })
  status: number;

  @Field({ nullable: true })
  message: string;

  @Field(() => Boolean, { nullable: true }) // Update the type to User
  data?: boolean | null;
}
