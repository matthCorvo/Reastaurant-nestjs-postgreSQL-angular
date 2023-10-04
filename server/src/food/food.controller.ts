import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe
  // UseGuards
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodEntity } from './entities/food.entity';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
// import { AuthenticationGuard } from '../utils/guards/authentification.guard';
// import { AuthorizeGuard } from '../utils/guards/authorization.guard';
// import { Roles } from '../utils/user-roles.enum';

@Controller('food')
@ApiTags('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  /**
   * Crée un nouveau kebab.
   *
   * @param {CreateFoodDto} createFoodDto - Les données du kebab à créer.
   * @returns {Promise<FoodEntity>} Le kebab créé.
   */
  // @ApiSecurity('JWT-auth') // Swagger api
  // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  async create(
    @Body(ValidationPipe) createFoodDto: CreateFoodDto
  ): Promise<FoodEntity> {
    return await this.foodService.create(createFoodDto);
  }

  /**
   * Récupère la liste de tous les kebabs.
   *
   * @returns {Promise<FoodEntity[]>} Un tableau de kebabs.
   */
  @Get()
  async findAll(): Promise<FoodEntity[]> {
    return await this.foodService.findAll();
  }

  /**
   * Récupère un kebab spécifique en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à récupérer.
   * @returns {Promise<FoodEntity>} Le kebab récupéré.
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FoodEntity> {
    return await this.foodService.findById(+id);
  }

  /**
   * Met à jour les informations d'un kebab en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à mettre à jour.
   * @param {UpdateFoodDto} updateFoodDto - Les données de mise à jour du kebab.
   * @returns {Promise<FoodEntity>} Le kebab mis à jour.
   */
  // @ApiSecurity('JWT-auth') // Swagger api
  // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFoodDto: UpdateFoodDto
  ): Promise<FoodEntity> {
    return await this.foodService.update(+id, updateFoodDto);
  }

  /**
   * Supprime un kebab en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à supprimer.
   */
  // @ApiSecurity('JWT-auth') // Swagger api
  // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.foodService.remove(+id);
  }
}
