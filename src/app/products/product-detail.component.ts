import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { IProduct } from 'src/products/product';
import { ProductService } from 'src/products/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle:string='Product Detail';
  productId!:number;
  selectedProduct: IProduct | undefined;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  constructor(private route: ActivatedRoute, private router: Router
    ,private productService: ProductService) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle = `Product Detail: ${this.productId}`;
    this.recoverProductListFromLocalStorage();
    
  }

  recoverProductListFromLocalStorage(){
    this.filteredProducts = JSON.parse(localStorage.getItem("product-list") || '[]');
    this.getProductById();
  }

  onBack():void{
    this.router.navigate(['/products']);
  }

  getProductById(){
    const p:IProduct[] = this.filteredProducts.filter(
      item => item.productId == this.productId
    );
    
    this.selectedProduct = p[0];
  }


}
