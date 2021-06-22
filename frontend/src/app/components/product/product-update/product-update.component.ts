import { Product } from './../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  };

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Esse tá pegando o id da rota
    const id: any = this.route.snapshot.paramMap.get('id')
    //Esse aqui está passando o id para o método readById
    this.productService.readById(id).subscribe(produto =>{
      //Aqui é uma atribuição ao product
      this.product = produto
    });
  }
  updateProduct(): void{
    if(this.product.name === '' || this.product.price === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por Favor, preencher os campos: Nome e Preço',
      })
    }else{
      this.productService.update(this.product).subscribe(() =>{
        this.productService.showMessage('Produto atualizado com sucesso')
            this.productService.read().subscribe(products => {
              this.productService.products = products
              //navegação para a tela de produto
              this.router.navigate(['/products'])
            });
        });
    }

  }
  cancel(): void{
    this.router.navigate(['/products'])
    this.productService.read().subscribe(products => {
      this.productService.products = products
    })
  }
}
