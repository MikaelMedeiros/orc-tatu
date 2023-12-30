import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) {}

  fazerLogin() {    
    this.authService.fazerLogin(this.usuario)
  }
}
