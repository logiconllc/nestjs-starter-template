import { Field, InputType } from '@nestjs/graphql';
import { MinLength, MaxLength, IsEmail, IsNotEmpty } from 'class-validator';
@InputType()
export class PartnerSignUpDTO {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  name: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters.' })
  newPassword: string;
}
