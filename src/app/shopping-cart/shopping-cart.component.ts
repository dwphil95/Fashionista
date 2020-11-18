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
  emptyMessage: String = ""
  constructor(private router: Router, private saleService: SaleService, private auth: AuthService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.total = this.calculateTotal()
    }
    else
      this.emptyMessage = "Your shopping cart is currently empty."
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
          var newQuantity = Number((<HTMLInputElement>document.getElementById("cartQuantity")).value)
          cartItem.quantity = newQuantity
          break
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.router.navigateByUrl('/shopping-cart');
  }

  deleteItem(item: FashionItem) {
    for (var i = 0; i < this.cart.length; i++) {
      var cartItem: CartItem = this.cart[i];
      if (cartItem.fashionItem._id == item._id) {
          this.cart.splice(i, 1)
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.router.navigateByUrl('/shopping-cart');
  }

}
