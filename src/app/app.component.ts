import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{  

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  toki: string | null = this.authService.token;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params["code"] !== undefined) {
          this.authService.getToken(params["code"]).subscribe(result => {
            if (result === true) {
              console.log("setando Token...", this.authService.token);
              this.toki = this.authService.token;
              window.localStorage.setItem('token', this.authService.token);              
            }
          });
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token')
    this.toki = null;
    this.router.navigate(['/login'])
  }
  
}
