import { CartItem } from './../../models/cartItem';
import { FashionItem } from './../../models/fashionItem';
import { ItemService } from './../../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  id: Number
  item: FashionItem

  constructor(private route: ActivatedRoute, private itemService: ItemService) { 
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.itemService.getFashionItembyId(this.id).subscribe(result => {
      this.item = result[0]
    })
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
