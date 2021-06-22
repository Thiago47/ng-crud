import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product ={
    name: '',
    price: 0
  };

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product =>{
      this.product = product
    })
  }

  deleteProduct(): void{
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
          this.productService.delete(this.product.id!).subscribe(()=>{
          this.productService.showMessage('Produto Excluido com Sucesso')
            this.productService.read().subscribe(products => {
              this.productService.products = products
              //navegação para a tela de produto
              this.router.navigate(['/products'])
            });
          });
      }
    })

  }
  cancel(): void{
    this.router.navigate(['/products'])
    this.productService.read().subscribe(products => {
      this.productService.products = products
    })
  }
}
