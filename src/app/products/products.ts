import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { ProductsService } from './services/products-service';
import { ProductsDto } from './model/products';
import { LoaderService } from '../shared/loader/loader-service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
})
export class Products implements OnInit {
  @Input() searchTerm: string = '';
  products: ProductsDto[] = [];
  images: {} = '';
  productsDetails!: ProductsDto;
  visible: boolean = false;

  constructor(
    private productsService: ProductsService,
    private loadingService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
      this.images = data;
      this.products.map((item: any) => {
        this.images = item.images;
      });
      this.loadingService.setLoading(false);
    });
  }

  get searchedProducts() {
    return this.products.filter((p) =>
      p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

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
    this.loadingService.setLoading(true);

    this.productsService.getProductsById(id).subscribe((data) => {
      this.productsDetails = data;
      console.log('', data);
      this.loadingService.setLoading(false);
    });
  }
}
