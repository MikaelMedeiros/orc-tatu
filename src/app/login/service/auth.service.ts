import { Injectable } from '@angular/core';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarios: Usuario[] = [
    {nome: 'mika', senha: '123'},
    {nome: 'ju', senha: '123'},
    new Usuario()
  ]

  private usuarioAutenticado = false;

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {

    if(this.existe(usuario)) {
      this.usuarioAutenticado = true;
      this.router.navigate(['/']);
    } else {
      this.usuarioAutenticado = false;
    }
  }

  existe(usuario: Usuario): boolean {
    return this.usuarios.some(obj => obj.nome === usuario.nome && obj.senha === usuario.senha);
  }
}
