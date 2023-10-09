import { OrderService } from "./../../client/src/app/services/order.service";
import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { UsersModule } from "../users/users.module"; // Import the UserModule
import { AuthModule } from "../auth/auth.module"; // Import the AuthModule

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UsersModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
