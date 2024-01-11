import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router)
  const codeToLogin: string = route.queryParams['code'];
  const token = window.localStorage.getItem('token');  
  
    if (codeToLogin || token) {
      route.queryParams = [];
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
};
