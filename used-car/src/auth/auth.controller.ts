import { Body, Controller, Post, Session } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { SignupDTO } from '../users/dtos/signup.dto';
import { UserDTO } from '../users/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDTO)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: SignupDTO, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SignupDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }
}
