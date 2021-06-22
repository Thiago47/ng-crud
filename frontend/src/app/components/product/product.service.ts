import { HttpClient } from '@angular/common/http';
//SERVICE é uma boa prática para criar atributos e métodos que vão ser utilizados em vários componentes
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Product } from './product.model';

//Injectable significa que essa classe pode ser injetada em outras classes
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  products: Product[] = []

  //private http: HttpClient injetando
  constructor(private http: HttpClient) { }

  atributo(header: any){
    this.products = header
  }

  showMessage(msg:string): void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
      background: '#ADFFFA',
    })
  }
  //inserir o produto no db.json
  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product)
  }

  //método responsavel por ler os produtos
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: number): Observable<Product>{
    const url = ` ${this.baseUrl}/${id}`
    //retorno do get
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product>{
    const url = ` ${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  delete(id: number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }
}
