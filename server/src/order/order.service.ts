import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrdersService {
  /**
   * Constructeur du service des commandes.
   *
   * @param orderRepository
   * @param opRepository
   * @param productService
   */
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity)
    private readonly opRepository: Repository<OrdersProductsEntity>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService
  ) {}

  /**
   * Crée une nouvelle commande.
   *
   * @param createOrderDto Les détails de la commande à créer.
   * @param currentUser L'utilisateur actuellement authentifié.
   * @returns La commande créée.
   */
  async create(
    createOrderDto: CreateOrderDto,
    currentUser: UserEntity
  ): Promise<OrderEntity> {
    // Crée une entité de livraison à partir des détails fournis
    const shippingEntity = new ShippingEntity();
    Object.assign(shippingEntity, createOrderDto.shippingAddress);

    // Crée une entité de commande liée à la livraison et à l'utilisateur actuel
    const orderEntity = new OrderEntity();
    orderEntity.shippingAddress = shippingEntity;
    orderEntity.user = currentUser;

    // Enregistre la commande dans la base de données
    const orderTbl = await this.orderRepository.save(orderEntity);

    // Prépare les détails de la relation entre la commande et les produits
    const opEntity: {
      order: OrderEntity;
      product: ProductEntity;
      product_quantity: number;
      product_unit_price: number;
    }[] = [];

    // Boucle à travers chaque produit de la commande
    for (let i = 0; i < createOrderDto.orderedProducts.length; i++) {
      // Récupère la commande parent (orderTbl) à laquelle le produit sera lié
      const order = orderTbl;
      // Récupère le produit correspondant à l'identifiant du produit de la commande
      const product = await this.productService.findById(
        createOrderDto.orderedProducts[i].id
      );
      // Récupère la quantité du produit à partir de la commande
      const product_quantity =
        createOrderDto.orderedProducts[i].product_quantity;

      // Récupère le prix unitaire du produit à partir de la commande
      const product_unit_price =
        createOrderDto.orderedProducts[i].product_unit_price;

      // Ajoute ces détails à un tableau d'objets pour créer les relations
      opEntity.push({
        order,                   // La commande parent
        product,                 // Le produit associé
        product_quantity,        // La quantité de ce produit dans la commande
        product_unit_price       // Le prix unitaire de ce produit dans la commande
      });
    }

    // Enregistre les relations entre la commande et les produits dans la base de données
    const op = await this.opRepository.createQueryBuilder()
      .insert()
      .into(OrdersProductsEntity)
      .values(opEntity)
      .execute();

    // Retourne la commande créée
    return await this.findOne(orderTbl.id);
  }

  /**
   * Récupère toutes les commandes.
   *
   * @returns La liste de toutes les commandes.
   */
  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: {
        shippingAddress: true,
        user: true,
        products: { product: true }
      }
    });
  }

  /**
   * Récupère une commande par userId.
   *
   * @param userId L'identifiant de l'user.
   * @returns La commande correspondante.
   */
  async findOne(userId: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { user: { id: userId } },
      relations: {
        shippingAddress: true,
        user: true,
        products: { product: true }
      }
    });
  }

  /**
   * Récupère une commande par Id.
   *
   * @param userId L'identifiant de la commande.
   * @returns La commande correspondante.
   */
  async findOneorder(id: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { user: { id: id } },
      relations: {
        shippingAddress: true,
        user: true,
        products: { product: true }
      }
    });
  }

  /**
   * Supprime une commande par son identifiant.
   *
   * @param id L'identifiant de la commande à supprimer.
   */
  async remove(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id: id } });
    await this.orderRepository.remove(order);
  }

}