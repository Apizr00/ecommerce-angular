import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }


  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin', {
      headers: this.createAuthorizationHeader(),
    })
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/product', productDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllproducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/products', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllproductsByName(name:any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`,  {
      headers: this.createAuthorizationHeader(),
    })
  }

  addCoupon(couponDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/coupons', couponDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getCoupons(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/coupons', {
      headers: this.createAuthorizationHeader(),
    })
  }

   getPlacedOrders(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/placedOrders', {
      headers: this.createAuthorizationHeader(),
    })
  }

  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/order/${orderId}/${status}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  postFAQ(productId: number, faqDto: string): Observable<any> {
    return this.http.post(BASIC_URL + `api/admin/order/${productId}`, faqDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }

  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Side error ,Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server side error, Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
