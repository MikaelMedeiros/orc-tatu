import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/pages/login/model/usuario';
import { AuthService } from 'src/app/pages/login/service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  user: Usuario = new Usuario();
  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
   this.callback()
  }


  callback(){
     var userInLocal = this.recuperarObjetoLocalStorage('user');
     if(userInLocal){
       this.user = userInLocal;
       this.router.navigateByUrl("/calculator")
     }else{
       this.route.queryParams
       .subscribe(params => {
         if (params["code"] !== undefined) {
           this.authService.getUser(params["code"]).subscribe(result => {
             if (result === true) {
               this.user = this.authService.user;
               this.salvarObjetoLocalStorage('user', this.user)
               this.router.navigateByUrl("/calculator")
             }
           });          
         }

       }
     );
     }
  }


  salvarObjetoLocalStorage(chave: string, objeto: Usuario): void {
    localStorage.setItem(chave, JSON.stringify(objeto));
  }

  recuperarObjetoLocalStorage(chave: string): any {
    const objetoString = localStorage.getItem(chave);
    
    try {
      if (objetoString && objetoString !== null && objetoString !== '{}') {
        return JSON.parse(objetoString);
      }
    } catch (error) {
      this.router.navigate(['/login']);
    }
    
    return null;
  }
}
