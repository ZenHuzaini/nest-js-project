import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//controller
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';

//services
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { PortofolioController } from './portofolio/portofolio.controller';
import { PortofolioService } from './portofolio/portofolio.service';
import { PortofolioModule } from './portofolio/portofolio.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/coba'),
    PortofolioModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
