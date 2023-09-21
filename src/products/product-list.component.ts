import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List !';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage = false;
    sub!: Subscription;
    errorMessage:string='';

    constructor(private productService: ProductService){}

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private _listFilter:string = '';
    get listFilter():string{
        return this._listFilter;
    }

    set listFilter(value: string){
        this._listFilter = value;
        console.log(`In setter: ${value}`);
        this.filteredProducts = this.performFilter(value);
    }

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
                this.saveOnLocalStorage(this.products);
            },
            error: err => this.errorMessage = err
        });
    }

    saveOnLocalStorage(p: IProduct[]){
        localStorage.setItem("product-list", JSON.stringify(p));
    }

    onNotify(message: string):void{
        this.pageTitle = `Product list: ${message}.`;
    }
}