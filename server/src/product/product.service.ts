import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  /**
   * Service de gestion des kebabs.
   *
   * @constructor
   * @param {Repository<ProductEntity>} productRepository - Le référentiel des entités de kebabs.
   */
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  /**
   * Crée un nouveau kebab en utilisant les données fournies dans le DTO.
   *
   * @param {CreateProductDto} createProductDto - Les données du kebab à créer.
   * @returns {Promise<ProductEntity>} Le kebab créé.
   */
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  /**
   * Récupère la liste de tous les kebabs.
   *
   * @returns {Promise<ProductEntity[]>} Un tableau des kebabs créé.
   */
  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  /**
   * Récupère un kebab spécifique en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à récupérer.
   * @returns {Promise<ProductEntity>} Le kebab récupéré.
   * @throws {NotFoundException} Si le kebab n'est pas trouvé.
   */
  async findById(id: number): Promise<ProductEntity> {
    const product: ProductEntity = await this.productRepository.findOne({
      where: { id: id }
    });
    if (!product) throw new NotFoundException('Produit non trouvé.');
    return product;
  }

  /**
   * Met à jour les informations d'un kebab en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à mettre à jour.
   * @param {UpdateProductDto} updateProductDto - Les données de mise à jour du kebab.
   * @returns {Promise<ProductEntity>} Le kebab mis à jour.
   */
  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id: id } });

    // Met à jour les propriétés du kebab
    product.title = updateProductDto.title;
    product.price = updateProductDto.price;

    return await this.productRepository.save(product);
  }

  /**
   * Supprime un produit en fonction de son ID.
   *
   * @param {number} id - L'ID du produit à supprimer.
   */
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    console.log(product);
    await this.productRepository.remove(product);
  }
}
