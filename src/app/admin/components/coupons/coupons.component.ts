import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent {

  coupon: any;

  constructor(private adminService: AdminService) { }

  ngOnInt() {
    this.getCoupons();
  }
  
  getCoupons() {
    this.adminService.getCoupons().subscribe(res => {
      this.coupon = res;
    })
  }

}
