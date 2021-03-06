import { DataSharingService } from './../services/data.service';
import { AuthService } from './../auth/auth.service';
import { Sale } from './../models/sale';
import { SaleService } from './../services/sale.service';
import { Router } from '@angular/router';
import { FashionItem } from './../models/fashionItem';
import { CartItem } from './../models/cartItem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  total: Number
  cart: CartItem[]
  constructor(private router: Router, private saleService: SaleService, private auth: AuthService, private dataSharingService: DataSharingService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.total = this.calculateTotal()
    }
  }

  calculateTotal() {
    var totalPrice = 0
    for (var i = 0; i < this.cart.length; i++) {
      var cartItem: CartItem = this.cart[i];
      totalPrice += (cartItem.fashionItem.price * cartItem.quantity)
    }
    return totalPrice
  }

  checkout() {
    var sale: Sale = {
      username: this.auth.getUsername(),
      cart: this.cart,
      totalPrice: this.total
    }

    this.saleService.storeSale(sale).subscribe(result => {
      alert("Purchase successful!")
      localStorage.removeItem('cart')
      this.router.navigateByUrl('/store');
    })
  }

  updateItemQuantity(item: FashionItem) {
    for (var i = 0; i < this.cart.length; i++) {
      var cartItem: CartItem = this.cart[i];
      if (cartItem.fashionItem._id == item._id) {
          var newQuantity = Number((<HTMLInputElement>document.getElementById("cartQuantity"+String(i))).value)
          if (newQuantity < 1 || newQuantity > 100)
            alert("Quantity not updated. Set a quantity from 1 to 100 only.")
          else {
            cartItem.quantity = newQuantity
            localStorage.setItem('cart', JSON.stringify(this.cart));
            alert("Quantity updated successfullly!")
            this.router.navigateByUrl('/shopping-cart');
          }
      }
    }
  }

  deleteItem(item: FashionItem) {
    for (var i = 0; i < this.cart.length; i++) {
      var cartItem: CartItem = this.cart[i];
      if (cartItem.fashionItem._id == item._id) {
          this.cart.splice(i, 1)
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.dataSharingService.cartSize.next(this.cart.length)
    this.router.navigateByUrl('/shopping-cart');
  }

}
