import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  url: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.retrieveGoogleLoginUrl();
  }

  retrieveGoogleLoginUrl() {
    this.authService.retrieveGoogleLoginUrl().subscribe((data: any) => this.url = data.googleAuthenticationUrl);
  }
}
