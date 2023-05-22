import jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  Body,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { TokenType } from './types/token';
import { CreateUserInputDTO, SignupAppUserDTO, SignupInputDTO } from './dto/inputs/create-user.dto';
import { OtpVerificationDTO } from './dto/inputs/otp-verification.dto';
import { LoginPayloadDTO } from './dto/inputs/login-payload.dto';
import { HttpStatus, HttpException } from '@nestjs/common';
import { User } from './user.entity';
import { createOtp, createPasswordHash } from '../../utils/global.utils';
import { PartnerSignUpDTO } from './dto/inputs/partner-signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}



  async userOtpVerification(@Body() otpVerificationDTO: OtpVerificationDTO): Promise<boolean> {
    try {
      const user = await this.userRepository.findOneBy({
        email: otpVerificationDTO.email,
      });
      if (user && user.otp === otpVerificationDTO.otp && user.otpExpiry < new Date()) {
        user.otp = null;
        user.otpExpiry = null;
        user.status = 'verified';
        await this.userRepository.save(user);
        return true;
      }

      return false;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // info setup For PARTNER

  async partnerInfoSetup(@Body() partnerSignUpDTO: PartnerSignUpDTO): Promise<User | undefined> {
    const { email, newPassword, name } = partnerSignUpDTO;

    try {
      const user = await this.userRepository.findOneBy({ email: email });
      if (!user) {
        throw new NotFoundException('Email does not exist');
      } else if (user && user.status !== 'verified') {
        throw new ForbiddenException('Your OTP verfication is pending!');
      }
      user.password = await createPasswordHash(newPassword);
      user.name = name;
      user.status = 'registered';
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //sign up for appUser

  async createAppUser(@Body() signupAppUserDTO: SignupAppUserDTO): Promise<User | undefined> {
    try {
      const userExist = await this.userRepository.findOneBy({
        email: signupAppUserDTO.email,
      });

      if (!userExist) {
        const user = new User();
        user.email = signupAppUserDTO.email;
        user.role = signupAppUserDTO.role;
        user.password = await createPasswordHash(signupAppUserDTO.password);
        const generatedOtp: string = createOtp();
        user.otp = generatedOtp;
        await this.userRepository.save(user);
        return user;
      } else {
        throw new ConflictException('User already exist!');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //LOGIN service
  async login(@Body() loginPayloadDTO: LoginPayloadDTO): Promise<TokenType> {
    try {
      const user = await this.userRepository.findOneBy({
        email: loginPayloadDTO.email,
        password: loginPayloadDTO.password,
      });
      const payload = {
        email: loginPayloadDTO.email,
      };
      const signedToken = jwt.sign(payload, 'kwanso');
      const token = {
        id: user.id,
        jwt: signedToken,
        res: {
          status: 200,
          message: 'Logged-in',
        },
      };
      return token;
    } catch (error) {
      throw new NotFoundException('User not found!');
    }
  }
}
