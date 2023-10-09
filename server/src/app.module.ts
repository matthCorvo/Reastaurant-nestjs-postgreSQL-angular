import { LocationService } from './../../client/src/app/services/location.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
// import { CurrentUserMiddleware } from './utils/middlewares/current-user.middleware';
import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    FoodModule,
    OrderModule,
  ],
  controllers: [],
  providers: [LocationService],
})
export class AppModule {}
