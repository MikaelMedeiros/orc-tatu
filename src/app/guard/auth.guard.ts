import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../pages/login/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router)
  //const authService: AuthService = inject(AuthService);
  const codeLogin: string = route.queryParams['code'];
  const token = window.localStorage.getItem('token');  
  
    if (codeLogin || token) {  
      //authService.getUser    
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
};
