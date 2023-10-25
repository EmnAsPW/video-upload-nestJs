import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from './../user/user-details.interface';
import { ExistingUserDTO } from './../user/dtos/existing-user.dto';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async signup(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password, confirmPassword } = user;


    if (!email.endsWith('@gmail.com')) {
      throw new HttpException('Only Gmail addresses are allowed for registration', HttpStatus.BAD_REQUEST);
    }

    if (password !== confirmPassword) {
      throw new HttpException('Password and Confirm Password do not match', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new HttpException('An account with that email already exists!', HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.hashPassword(password);

    try {
      const newUser = await this.userService.create(name, email, hashedPassword, confirmPassword);
      return this.userService._getUserDetails(newUser);
    } catch (error) {
      this.logger.error(`Error during user registration: ${error.message}`);
      throw new HttpException('User registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);

    if (!doesPasswordMatch) {
      return null;
    }

    return this.userService._getUserDetails(user);
  }

  async login(existingUser: ExistingUserDTO): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    try {
      const jwt = await this.jwtService.signAsync({ user });
      return { token: jwt };
    } catch (error) {
      this.logger.error(`Error during JWT generation: ${error.message}`);
      throw new HttpException('JWT generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      this.logger.error(`Invalid JWT: ${error.message}`);
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}