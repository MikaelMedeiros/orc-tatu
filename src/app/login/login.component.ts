import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private usuario: Usuario = new Usuario();
  url: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fazerLogin();
  }

  fazerLogin() {    
    this.authService.fazerLogin().subscribe((data: any) => this.url = data.authURL);    
  }
}
