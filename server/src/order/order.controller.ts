import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthenticationGuard } from '../utils/guards/authentification.guard';
import { CurrentUser } from '../utils/decorators/current-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/utils/guards/authorization.guard';
import { Roles } from 'src/utils/user-roles.enum';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  /**
   * Crée une nouvelle commande.
   *
   * @param createOrderDto Les détails de la commande à créer.
   * @param currentUser L'utilisateur actuellement authentifié.
   * @returns La commande créée.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserEntity
  ): Promise<OrderEntity> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  /**
   * Récupère toutes les commandes.
   *
   * @returns La liste de toutes les commandes.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  /**
   * Récupère une commande par son identifiant.
   *
   * @param id L'identifiant de la commande à récupérer.
   * @returns La commande correspondante.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard)
  @Get(':userId')
  async findUserOrders(@Param('userId') userId: number): Promise<OrderEntity> {
    return await this.ordersService.findOne(userId);
  }

  /**
   * Récupère une commande par son identifiant.
   *
   * @param id L'identifiant de la commande à récupérer.
   * @returns La commande correspondante.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async findOneorder(@Param('id') id: number): Promise<OrderEntity> {
    return await this.ordersService.findOne(id);
  }

  

    /**
   * Supprime une commande par son identifiant.
   *
   * @param id L'identifiant de la commande à supprimer.
   * @returns {Promise<void>}
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.ordersService.remove(+id);
  }
}