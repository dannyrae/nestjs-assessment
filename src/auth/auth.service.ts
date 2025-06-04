import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(signInDto: SignInDto) {
    const { email, password, username } = signInDto;

    const identifier = email ?? username;
    if (!identifier) {
      throw new BadRequestException('Email or username must be provided');
    }

    const user = await this.userService.getUserOrThrow(identifier);
    await user.verifyPassword(password);

    const token = this.jwtService.sign({ sub: user.id });

    return { token };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, username } = signUpDto;

    if (await this.userService.getUser(email)) {
      throw new BadRequestException('Email already exists!');
    } else if (await this.userService.getUser(username)) {
      throw new BadRequestException('Username already exists!');
    }
    const user = await this.userService.createUser(signUpDto);

    const token = this.jwtService.sign({ sub: user.id });
    return { token };
  }

}