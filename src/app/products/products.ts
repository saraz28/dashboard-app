import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { ProductsService } from './services/products-service';
import { ProductsDto } from './model/products';
import { LoaderService } from '../shared/loader/loader-service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
})
export class Products implements OnInit, OnChanges {
  @Input() searchTerm: string = '';
  products: ProductsDto[] = [];
  images: {} = '';
  productsDetails!: ProductsDto;
  visible: boolean = false;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;
  pageEvent!: PageEvent;
  pagedProducts: ProductsDto[] = [];

  constructor(
    private productsService: ProductsService,
    private loadingService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.pageIndex = 0;
      this.updatePagedOrders();
    }
  }
  getProductsData() {
    this.loadingService.setLoading(true);
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.images = data;
        this.updatePagedOrders();
        this.cdRef.detectChanges();
        this.products.map((item: any) => {
          this.images = item.images;
        });
        this.loadingService.setLoading(false);
      },
      () => {
        Swal.fire({
          text: 'Something went wrong while processing your request. Please try again later.',
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false,
        });
      }
    );
  }

  get searchedProducts() {
    return this.products.filter((p) =>
      p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // show dialog on details
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

  // get product by id
  getproductsById(id: number) {
    this.visible = true;
    this.loadingService.setLoading(true);

    this.productsService.getProductsById(id).subscribe(
      (data) => {
        this.productsDetails = data;
        this.loadingService.setLoading(false);
      },
      () => {
        Swal.fire({
          text: 'Something went wrong while processing your request. Please try again later.',
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false,
        });
      }
    );
  }
  updatePagedOrders() {
    let filtered = this.products;
    if (this.searchTerm) {
      filtered = this.products.filter((p) =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.length = filtered.length;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = filtered.slice(start, end);
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.searchTerm = '';
    this.updatePagedOrders();
  }
}
