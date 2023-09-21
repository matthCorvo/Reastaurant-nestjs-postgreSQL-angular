import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { AuthenticationGuard } from '../utils/guards/authentification.guard';
import { AuthorizeGuard } from '../utils/guards/authorization.guard';
import { Roles } from '../utils/user-roles.enum';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Crée un nouveau kebab.
   *
   * @param {CreateProductDto} createProductDto - Les données du kebab à créer.
   * @returns {Promise<ProductEntity>} Le kebab créé.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  async create(
    @Body(ValidationPipe) createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    return await this.productService.create(createProductDto);
  }

  /**
   * Récupère la liste de tous les kebabs.
   *
   * @returns {Promise<ProductEntity[]>} Un tableau de kebabs.
   */
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productService.findAll();
  }

  /**
   * Récupère un kebab spécifique en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à récupérer.
   * @returns {Promise<ProductEntity>} Le kebab récupéré.
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductEntity> {
    return await this.productService.findById(+id);
  }

  /**
   * Met à jour les informations d'un kebab en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à mettre à jour.
   * @param {UpdateProductDto} updateProductDto - Les données de mise à jour du kebab.
   * @returns {Promise<ProductEntity>} Le kebab mis à jour.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    return await this.productService.update(+id, updateProductDto);
  }

  /**
   * Supprime un kebab en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à supprimer.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.productService.remove(+id);
  }
}
