import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { Product } from 'src/app/components/product/product.model';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  //private router: Route estou passando para o construtor o Route para usar no método
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //Esse método é para navegar até o componente refenciado sem precisar routerLink
  navigateToProductCreate(): void{
    //Aqui estou fazendo uma chamada de navegação (obs: router precisa está no constructor)
    this.router.navigate(['/products/create'])
  }

}
