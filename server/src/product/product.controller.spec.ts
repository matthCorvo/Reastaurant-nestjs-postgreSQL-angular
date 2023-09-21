import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {

        const createProductDto: CreateProductDto = {
        title: 'Test Product',
        price: 9.99
      };

      const expectedProduct: ProductEntity = {
        id: 1,
        title: 'Test Product',
        price: 9.99,
        products: []
    };

      jest.spyOn(productService, 'create').mockResolvedValue(expectedProduct);

      const result = await controller.create(createProductDto);

      expect(result).toEqual(expectedProduct);
    });
  })

});
