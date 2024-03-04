import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }
    


  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null,[Validators.required]]
    })
    
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllproducts().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteimg;
        this.products.push(element);

      });
    })
  }

  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllproductsByName(title).subscribe(res =>{
      res.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64 '+ element.byteImg;
        this.products.push(element);
      });
      console.log(this.products)
    })
  }

  deleteProduct(productId:any){
    this.adminService.deleteProduct(productId).subscribe(res=>{
      if(res.body == null){
        this.snackBar.open('Product Deleted Successfully', 'close',{
          duration: 5000
        });
        this.getAllProducts();
         
      }else{
        this.snackBar.open(res.message, 'close',{
          duration: 5000
        });

      }
    })
  }

}
