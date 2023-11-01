import { VideoModule } from './video/video.module';
import { Module } from '@nestjs/common';

//mport { VideoService } from './video/video.service';
//import { VideoController } from './video/video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileImageModule } from './profile-image/profile-image.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
//import { VideoResolver } from './graphql/video.resolver';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://emonsourov:haCSbuZrobyBXent@videodb.m3rgdgm.mongodb.net/?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({
      // autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql'),
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    VideoModule,
    AuthModule,
    UserModule,
    ProfileImageModule,

    // MongooseModule.forRoot("mongodb://127.0.0.1:27017/newDb"), VideoModule
  ],
  providers: [],
})
export class AppModule {}
