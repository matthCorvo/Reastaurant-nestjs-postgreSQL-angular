import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../utils/guards/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}