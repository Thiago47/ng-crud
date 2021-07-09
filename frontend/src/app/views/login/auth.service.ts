import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor( private router: Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome === 'admin' && usuario.senha === 'admin@12345'){
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      //colocar uma rota depois do cadastro
      this.router.navigate(['/']);
    }else{
      this.usuarioAutenticado = false
      this.mostrarMenuEmitter.emit(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuário não cadastrado!',
      });
    }
  }
}
