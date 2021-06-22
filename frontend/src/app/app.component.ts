import { Component } from '@angular/core';
import { Product } from './components/product/product.model';
import { ProductService } from './components/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  products: Product[] = []

  constructor(private productService: ProductService) { }

  //Esse método é chamado na inicialização da classe uma única vez
  ngOnInit(): void {
  }
  onMudouValor(evento:any){
    this.products = evento
    this.productService.atributo(this.products)
  }
}
