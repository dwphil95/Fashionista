import { fadeInAnimation } from './../_animations/index';
import { CartItem } from './../models/cartItem';
import { Router } from '@angular/router';
import { FashionItem } from './../models/fashionItem';
import { ItemService } from './../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],

  // make fade in animation available to this component
  animations: [fadeInAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class StoreComponent implements OnInit {

  fashionItems: FashionItem[]
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.itemService.getFashionItems().subscribe(result => {
        this.fashionItems = result
    })
  }

  itemDetails(id: any) {
      this.router.navigateByUrl(`/item-details/${id}`)
  }

  addToCart(item: FashionItem) {
    if (localStorage.getItem("cart")) {
      var index: number = -1;
      var cart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < cart.length; i++) {
        var cartItem: CartItem = cart[i];
        if (cartItem.fashionItem._id == item._id) {
            index = i;
            break;
        }
      }
      if (index == -1) {
        var cartItem: CartItem = {
          fashionItem: item,
          quantity: 1
        }
        cart.push(cartItem);
      } 
      else {
        var cartItem: CartItem = cart[index];
        cartItem.quantity += 1;
        cart[index] = cartItem;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    else {
        var cart: any = []
        var cartItem: CartItem = {
          fashionItem: item,
          quantity: 1
        }
        cart.push(cartItem)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    alert("Added item to cart successfully!")
  }  

}
