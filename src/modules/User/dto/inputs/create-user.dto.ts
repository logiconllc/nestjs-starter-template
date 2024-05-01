import { Field, InputType } from '@nestjs/graphql';

import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../user.entity';
// partner creation for OTP creation by admin....
@InputType()
export class CreateUserInputDTO {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  role: UserRole;
}

@InputType()
export class SignupInputDTO extends PickType(CreateUserInputDTO, ['email']) {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
