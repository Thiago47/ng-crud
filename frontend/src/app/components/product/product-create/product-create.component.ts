import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0 //arrumar error
  }


  products!: Product[] //arrumar //Array do Json

  //private productService: ProductService  -> Significa que está injetando o product.service.ts nessa classe
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

  }

  createProduct(): void{
      if(this.product.name === '' || this.product.price === null){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por Favor, preencher os campos: Nome e Preço',
        })
      }else{
        //verificar se existi o nome
        this.productService.read().subscribe(products => {

          //Mapeando array com filter
          products = products.filter(nome =>{
              if(nome.name == this.product.name){
                return true;
              }else{
                return false;
              }

          })
          //atribuição
          this.products = products

          if(this.products.length == 0){
            this.productService.create(this.product).subscribe(()=>{
              //mensagem de alerta!
              this.productService.showMessage('Produto Criado!')
              //navegação para a tela de produto
              //this.router.navigate(['/products'])
              this.productService.read().subscribe(products => {
                this.productService.products = products
                //navegação para a tela de produto
                this.router.navigate(['/products'])
              });
            });

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Produto já cadastrado!',
            })
          }
        })

      }

  }
  //método para navegar para outra página
  cancel(): void{
    this.router.navigate(['/products'])
    this.productService.read().subscribe(products => {
      this.productService.products = products
    })
  }

}
