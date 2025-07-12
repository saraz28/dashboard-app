import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  model,
  OnInit,
} from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { ProductsService } from './services/products-service';
import { ProductsDto } from './model/products';
import { App } from '../app';

@Component({
  selector: 'app-products',
  imports: [SharedModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  constructor(
    private productsService: ProductsService,
  ) {}

  products: ProductsDto[] = [];
  images: {} = '';
  productsDetails!: ProductsDto;
  private app = inject(App);

  ngOnInit(): void {
    this.app.setLoading(true);
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
      this.images = data;
      this.products.map((item: any) => {
        this.images = item.images;
      });
      this.app.setLoading(false);
    });
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '991px',
      numVisible: 4,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  getproductsById(id: number) {
    this.visible = true;
    this.app.setLoading(true);

    this.productsService.getProductsById(id).subscribe((data) => {
      this.productsDetails = data;
      console.log('', data);
      this.app.setLoading(false);
    });
  }
}
