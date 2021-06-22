import { ProductService } from './../product.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit, DoCheck {

  products: Product[] = [] //sobreescrever

  constructor(private productService: ProductService) { }
  //está checando os valores
  ngDoCheck(){
      this.products = this.productService.products
  }

  //Esse método é chamado na inicialização da classe uma única vez
  ngOnInit(): void {

  }
}
