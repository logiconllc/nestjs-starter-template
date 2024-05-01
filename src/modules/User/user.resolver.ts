import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginPayloadDTO } from './dto/inputs/login-payload.dto';
import { TokenType } from './types/Token';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

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
