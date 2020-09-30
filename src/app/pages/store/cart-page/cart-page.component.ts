import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartUtil } from 'src/app/utils/cart.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {
  public cart: Cart = new Cart();

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  public loadCart() {
    this.cart = CartUtil.get();
    for(let i = 0; i < this.cart.items.length; i++)
    {
      for(let x = i+1; x < this.cart.items.length; x++)
      {
        if(this.cart.items[i].product == this.cart.items[x].product)
        {
          this.cart.items[i].quantity += 1;
          this.remove(this.cart.items[x]);
        }
      }  
    }
  }

  public total() {
    let total = 0;
    this.cart.items.forEach((item) => {
      total += (item.price * item.quantity);
    });
    return total;
  }

  public remove(item) {
    let index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  public clear() {
    CartUtil.clear();
    this.loadCart();
  }

}