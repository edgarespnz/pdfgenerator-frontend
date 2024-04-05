import { Component } from '@angular/core';

@Component({
  selector: 'app-loop-product',
  templateUrl: './loop-product.component.html',
  styleUrls: ['./loop-product.component.css']
})
export class LoopProductComponent {

    product = 
      {
        "sku": "KLEV5011",
        "name": "Pack Iso Whey 5 kg Chocolate + Creatina Kevin Levrone 300gr",
        "regular_price": "S/ 669.80",
        "discounted_price": "S/ 439.90",
        "position": 200,
        "categories": "PACKS & COMBOS",
        "labels": "KEVIN LEVRONE,OFERTAMARZO2024",
        "brand": "KEVIN LEVRONE",
        "special_offer": "OFERTAMARZO2024"
      }
    

    constructor() { 
      
    }

    addToCart(){
      console.log('Producto agregado al carrito');
    }

}
