import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/login/service/auth.service';
import { Usuario } from 'src/app/login/usuario';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  user: Usuario = new Usuario();
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    console.log(1)
    // window.localStorage.setItem('token', 'token-teste');
    this.route.queryParams
      .subscribe(params => {
        if (params["code"] !== undefined) {
          console.log(2)
          this.authService.getUser(params["code"]).subscribe(result => {
            if (result === true) {
              console.log(3)
              console.log("setando Token...", this.authService.token);
              window.localStorage.setItem('token', this.authService.token);
              this.user = this.authService.user;
              // console.log(this.user)
            }
          });
        }
      }
    );
  }


}
