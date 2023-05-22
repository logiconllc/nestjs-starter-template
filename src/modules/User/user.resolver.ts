import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { TokenType } from './types/Token';
import { UserService } from './user.service';
import { CreateUserInputDTO, SignupAppUserDTO } from './dto/inputs/create-user.dto';
import { OtpVerificationDTO } from './dto/inputs/otp-verification.dto';
import { ResponsePayloadBool } from './dto/responses/response-user.dto';
import { LoginPayloadDTO } from './dto/inputs/login-payload.dto';
import { ResponsePayload } from './dto/responses/response-user.dto';
import { PartnerSignUpDTO } from './dto/inputs/partner-signup.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  //User Creation For Invite MUTATION
  @Mutation(() => ResponsePayload, { name: 'userCreation' })
  async userCreation(@Args('createUserInputDTO') createUserInputDTO: CreateUserInputDTO): Promise<ResponsePayload> {
    const user = await this.usersService.partnerCreation(createUserInputDTO);
    return {
      status: 200,
      message: 'User signed up successfully!',
      data: user,
    };
  }

  @Mutation(() => ResponsePayloadBool, { name: 'userVerification' })
  async userVerification(
    @Args('OtpVerificationDTO') otpVerifictationDTO: OtpVerificationDTO
  ): Promise<ResponsePayloadBool> {
    const verificationStatus = await this.usersService.userOtpVerification(otpVerifictationDTO);
    if (verificationStatus) {
      return {
        status: 200,
        message: 'OTP verfication successfull!',
        data: verificationStatus,
      };
    } else {
      return {
        status: 401,
        message: 'OTP verfication failed!',
        data: verificationStatus,
      };
    }
  }

  @Mutation(() => ResponsePayload, { name: 'partnerSignup' })
  async partnerSignup(@Args('PartnerSignUpDTO') partnerSignUpDTO: PartnerSignUpDTO): Promise<ResponsePayload> {
    const user = await this.usersService.partnerInfoSetup(partnerSignUpDTO);
    if (user) {
      return {
        status: 200,
        message: 'user sign up successfully!',
        data: user,
      };
    }
  }

  //appUser sign up
  @Mutation(() => ResponsePayload, { name: 'appUserSignUp' })
  async appUserSignUp(@Args('SignupAppUserDTO') signupAppUserDTO: SignupAppUserDTO): Promise<ResponsePayload> {
    const user = await this.usersService.createAppUser(signupAppUserDTO);
    if (user) {
      return {
        status: 200,
        message: 'User signed up successfully!',
        data: user,
      };
    } else {
      return {
        status: 409,
        message: 'User already exist!',
        data: null,
      };
    }
  }

  //GET-USERS MUTATION
  @Mutation(() => TokenType, { name: 'login' })
  async login(@Args('loginPayloadDTO') loginPayloadDTO: LoginPayloadDTO): Promise<TokenType> {
    const token = await this.usersService.login(loginPayloadDTO);
    return token;
  }

  @Query(() => String, { name: 'userData' })
  user(): string {
    return 'hello';
  }
}
