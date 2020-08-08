import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CartService } from './../../../../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-chekout-dialog',
  templateUrl: './product-chekout-dialog.component.html',
  styleUrls: ['./product-chekout-dialog.component.scss']
})
export class ProductChekoutDialogComponent implements OnInit {
product:any =null;
modalRef: BsModalRef;
  constructor(private cartService:CartService,private router:Router) { }

  ngOnInit(): void {
      this.cartService.getProductModal().subscribe((pro)=>{
          console.log(pro);
          this.product = pro
      })
  }

  closeModal(){
      this.cartService.closeModal()
  }

  goto(){
this.router.navigate(["shop/cart/checkout"]).then(()=> this.closeModal())
  }
}
