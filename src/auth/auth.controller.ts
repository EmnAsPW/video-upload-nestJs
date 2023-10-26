import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  // @ts-ignore
  @UseInterceptors(FilesInterceptor())
  async register(
    //@UploadedFile() file: Express.Multer.File,
    @Body() user: NewUserDTO,
  ): Promise<UserDetails | null> {
    try {
      return await this.authService.signup(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    try {
      const token = await this.authService.login(user);
      return token ;
    } catch (error) {
   
      throw new Error('Login failed: ' + error.message);
    }
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  async verifyJwt(@Body() payload: { jwt: string }) {
    try {
      return await this.authService.verifyJwt(payload.jwt);
    } catch (error) {
      
      throw new Error('JWT verification failed: ' + error.message);
    }
  }
}

/*
@post('/uploadimage')
@UseInterceptors(FilesInterceptor('image', {
  storage:diskStorage({
  destination: './uploads/profileimages',
  filename: (req, file, cb) => {
    const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
    const extension: string = path.parse(file.originalname).ext;
    cb(null, `${filename}${extension}`);
  },
}),
}))

UploadedFile(@Res res, @UploadedFile() file){
  return resizeBy.status(HttpStatus.OK).json({
    success: true;
    data: file.path
  });
}
*/