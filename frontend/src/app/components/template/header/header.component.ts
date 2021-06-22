import { Product } from './../../product/product.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../product/product.service';
//importando a classe ProductReadComponent

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0 //arrumar error
  }
  products: Product[] = []
  //emitindo um evento
  @Output() mudouValor = new EventEmitter();

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
  }
  clearRota(){
    this.product.name = ''

    this.productService.read().subscribe(products => {
      this.products = products //está certo

      this.mudouValor.emit(this.products)
    });
  }
  //método para pesquisar
  searchProduct(): void{
    let pesquisa = this.product.name
    //Direcionar para a tela de produtos
    this.router.navigate(['/products'])
    if(pesquisa === ''){
      this.productService.read().subscribe(products => {

        this.products = products //está certo

        this.mudouValor.emit(this.products)
      });
    } else{
      this.productService.read().subscribe(products => {
        let pesquisaFiltrada = products;
        let resultado = pesquisaFiltrada.filter(retorno =>{
          return retorno.name.toLowerCase().indexOf(pesquisa.toLowerCase()) != -1;
        })
       this.products = resultado;

       this.mudouValor.emit(this.products)
      });
    }

  }
}
