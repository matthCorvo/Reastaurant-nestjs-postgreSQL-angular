import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
// import { CurrentUserMiddleware } from './utils/middlewares/current-user.middleware';
import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    FoodModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
