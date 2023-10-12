import { VideoModule} from './video/video.module';
import { Module } from '@nestjs/common';


//mport { VideoService } from './video/video.service';
//import { VideoController } from './video/video.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://emonsourov:haCSbuZrobyBXent@videodb.m3rgdgm.mongodb.net/?retryWrites=true&w=majority', {
    }), VideoModule
  ],
  
})
export class AppModule {}
