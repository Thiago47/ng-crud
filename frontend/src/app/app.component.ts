import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from './components/product/product.model';
import { ProductService } from './components/product/product.service';
import { AuthService } from './views/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {

  products: Product[] = []

  mostrarMenu: boolean = false;

  ocultarLogin: boolean = true;

  constructor(private productService: ProductService, private authService: AuthService) { }
  ngDoCheck(){
    if(this.mostrarMenu === true){
      this.ocultarLogin = false
    }
  }
  //Esse método é chamado na inicialização da classe uma única vez
  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
  onMudouValor(evento:any){
    this.products = evento
    this.productService.atributo(this.products)
  }
}
