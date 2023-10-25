import { VideoModule} from './video/video.module';
import { Module } from '@nestjs/common';


//mport { VideoService } from './video/video.service';
//import { VideoController } from './video/video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


@Module({   
  imports: [    
    MongooseModule.forRoot("mongodb+srv://emonsourov:haCSbuZrobyBXent@videodb.m3rgdgm.mongodb.net/?retryWrites=true&w=majority"), VideoModule, AuthModule, UserModule, 
    // MongooseModule.forRoot("mongodb://127.0.0.1:27017/newDb"), VideoModule
  ], 
   
})
export class AppModule {}
