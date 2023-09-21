import { Injectable, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, filter, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    productUrl:string='https://compasstaxi.mx/products.php';
    constructor(private http: HttpClient){}
  
    getProducts(): Observable<IProduct[]>{
      return this.http.get<IProduct[]>(this.productUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
    }

    handleError(err: HttpErrorResponse){
      let errorMessage = '';
      if(err.error instanceof ErrorEvent){
        errorMessage = `An error ocurred: ${err.error.message}`;
      }else{
        errorMessage = `Server returned code: ${err.status},  error message is: ${err.message}`;
      }

      console.error(errorMessage);
      return  throwError(()=>errorMessage);
    }
}