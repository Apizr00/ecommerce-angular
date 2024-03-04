import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/customer/services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] =[];
  order: any;

  constructor(private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,){}

    ngOnInit(): void{
      this.getCart();
    }

    getCart(){
      this.cartItems = [];
      this.customerService.getCartByUserId().subscribe(res =>{
        this.order = res;
        res.cartItems.forEach(element =>{
          element.processed = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element);
        });
      })

    }

}