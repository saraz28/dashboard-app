import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  model,
  OnInit,
} from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { ProductsService } from './services/products-service';

@Component({
  selector: 'app-products',
  imports: [SharedModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  products: any;
  images: {} = '';
  productsDetails: any;

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
      this.images = data;
      this.cdr.detectChanges();
      this.products.map((item: any) => {
        this.images = item.images;
      });
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
    this.productsService.getProductsById(id).subscribe((data) => {
      this.productsDetails = data;
      console.log('', data);
    });
  }
}
