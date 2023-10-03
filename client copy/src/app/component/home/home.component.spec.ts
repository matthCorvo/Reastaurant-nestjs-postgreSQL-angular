import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { ProductModelServer } from 'src/app/model/product.model'; // Importez le type ProductModelServer

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', ['getAllProducts', 'getSingleProduct']);
    cartService = jasmine.createSpyObj('CartService', ['addToCart']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: CartService, useValue: cartService },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call productService.getAllProducts on ngOnInit', () => {
    const mockProducts: ProductModelServer[] = [
        { id: 1, title: 'Produit 1', price: 10.99 },
        { id: 2, title: 'Produit 2', price: 19.99 },
      ];

    productService.getAllProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });

  it('should call cartService.addToCart when addToCart is called', () => {
    const mockProductId = 1;
    const mockProduct: ProductModelServer = { id: mockProductId } as ProductModelServer; // Définissez le type de mockProduct

    productService.getSingleProduct.and.returnValue(of(mockProduct));

    component.addToCart(mockProductId);

    expect(productService.getSingleProduct).toHaveBeenCalledWith(mockProductId);
    expect(cartService.addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
